"""
Rate limiting middleware for FastAPI.
Prevents API abuse and protects against bot scraping.
"""

from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import time
from collections import defaultdict
from typing import Dict, Tuple, Optional
import asyncio
from dataclasses import dataclass
from datetime import datetime


@dataclass
class RateLimitConfig:
    """Configuration for rate limiting"""
    requests_per_minute: int = 20
    requests_per_hour: int = 200
    burst_limit: int = 5
    burst_window_seconds: int = 10
    whitelist_ips: list = None
    blacklist_ips: list = None

    def __post_init__(self):
        if self.whitelist_ips is None:
            self.whitelist_ips = ["127.0.0.1", "::1"]
        if self.blacklist_ips is None:
            self.blacklist_ips = []


class RateLimiter:
    """
    Token bucket rate limiter with sliding window.
    Tracks requests by IP address.
    """

    def __init__(self, config: Optional[RateLimitConfig] = None):
        self.config = config or RateLimitConfig()

        # Stores: ip -> [(timestamp, count), ...]
        self.minute_requests: Dict[str, list] = defaultdict(list)
        self.hour_requests: Dict[str, list] = defaultdict(list)
        self.burst_requests: Dict[str, list] = defaultdict(list)

        # Cleanup task
        self._cleanup_task = None

    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP from request, handling proxies."""
        # Check X-Forwarded-For header (for reverse proxy setups)
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            # Take the first IP in the chain
            return forwarded.split(",")[0].strip()

        # Check X-Real-IP header
        real_ip = request.headers.get("X-Real-IP")
        if real_ip:
            return real_ip.strip()

        # Fall back to direct client IP
        if request.client:
            return request.client.host

        return "unknown"

    def _cleanup_old_requests(self, ip: str, window_seconds: int, storage: Dict[str, list]) -> list:
        """Remove requests older than the window."""
        current_time = time.time()
        cutoff = current_time - window_seconds

        storage[ip] = [ts for ts in storage[ip] if ts > cutoff]
        return storage[ip]

    def check_rate_limit(self, request: Request) -> Tuple[bool, Optional[str], Optional[int]]:
        """
        Check if request should be rate limited.

        Returns:
            Tuple of (allowed, error_message, retry_after_seconds)
        """
        ip = self._get_client_ip(request)
        current_time = time.time()

        # Check whitelist
        if ip in self.config.whitelist_ips:
            return True, None, None

        # Check blacklist
        if ip in self.config.blacklist_ips:
            return False, "IP address blocked", None

        # Check burst limit (5 requests per 10 seconds)
        burst_requests = self._cleanup_old_requests(
            ip, self.config.burst_window_seconds, self.burst_requests
        )
        if len(burst_requests) >= self.config.burst_limit:
            retry_after = int(self.config.burst_window_seconds - (current_time - burst_requests[0]))
            return False, f"Too many requests. Please slow down.", max(1, retry_after)

        # Check per-minute limit
        minute_requests = self._cleanup_old_requests(ip, 60, self.minute_requests)
        if len(minute_requests) >= self.config.requests_per_minute:
            retry_after = int(60 - (current_time - minute_requests[0]))
            return False, f"Rate limit exceeded. Maximum {self.config.requests_per_minute} requests per minute.", max(1, retry_after)

        # Check per-hour limit
        hour_requests = self._cleanup_old_requests(ip, 3600, self.hour_requests)
        if len(hour_requests) >= self.config.requests_per_hour:
            retry_after = int(3600 - (current_time - hour_requests[0]))
            return False, f"Hourly limit exceeded. Maximum {self.config.requests_per_hour} requests per hour.", max(1, retry_after)

        # Record the request
        self.minute_requests[ip].append(current_time)
        self.hour_requests[ip].append(current_time)
        self.burst_requests[ip].append(current_time)

        return True, None, None

    def get_remaining_requests(self, request: Request) -> Dict[str, int]:
        """Get remaining request counts for an IP."""
        ip = self._get_client_ip(request)

        minute_requests = self._cleanup_old_requests(ip, 60, self.minute_requests)
        hour_requests = self._cleanup_old_requests(ip, 3600, self.hour_requests)

        return {
            "remaining_per_minute": max(0, self.config.requests_per_minute - len(minute_requests)),
            "remaining_per_hour": max(0, self.config.requests_per_hour - len(hour_requests)),
            "reset_minute": 60,
            "reset_hour": 3600
        }

    async def cleanup_expired(self):
        """Periodically clean up expired entries."""
        while True:
            await asyncio.sleep(300)  # Run every 5 minutes

            current_time = time.time()
            minute_cutoff = current_time - 60
            hour_cutoff = current_time - 3600

            # Clean minute requests
            for ip in list(self.minute_requests.keys()):
                self.minute_requests[ip] = [ts for ts in self.minute_requests[ip] if ts > minute_cutoff]
                if not self.minute_requests[ip]:
                    del self.minute_requests[ip]

            # Clean hour requests
            for ip in list(self.hour_requests.keys()):
                self.hour_requests[ip] = [ts for ts in self.hour_requests[ip] if ts > hour_cutoff]
                if not self.hour_requests[ip]:
                    del self.hour_requests[ip]


class RateLimitMiddleware(BaseHTTPMiddleware):
    """FastAPI middleware for rate limiting."""

    def __init__(self, app, config: Optional[RateLimitConfig] = None, exclude_paths: list = None):
        super().__init__(app)
        self.limiter = RateLimiter(config)
        self.exclude_paths = exclude_paths or [
            "/health",
            "/docs",
            "/redoc",
            "/openapi.json",
            "/static",
            "/favicon.ico"
        ]

    async def dispatch(self, request: Request, call_next) -> Response:
        # Skip rate limiting for excluded paths
        path = request.url.path
        if any(path.startswith(excluded) for excluded in self.exclude_paths):
            return await call_next(request)

        # Check rate limit
        allowed, error_message, retry_after = self.limiter.check_rate_limit(request)

        if not allowed:
            # Return 429 Too Many Requests
            headers = {
                "Retry-After": str(retry_after) if retry_after else "60",
                "X-RateLimit-Limit": str(self.limiter.config.requests_per_minute),
                "X-RateLimit-Remaining": "0"
            }

            raise HTTPException(
                status_code=429,
                detail={
                    "error": True,
                    "message": error_message,
                    "retry_after": retry_after
                },
                headers=headers
            )

        # Process request
        response = await call_next(request)

        # Add rate limit headers to response
        remaining = self.limiter.get_remaining_requests(request)
        response.headers["X-RateLimit-Limit"] = str(self.limiter.config.requests_per_minute)
        response.headers["X-RateLimit-Remaining"] = str(remaining["remaining_per_minute"])
        response.headers["X-RateLimit-Reset"] = str(remaining["reset_minute"])

        return response


# =====================================================
# ENDPOINT-SPECIFIC RATE LIMITERS
# =====================================================

class EndpointRateLimiter:
    """
    Rate limiter for specific endpoints with different limits.
    """

    def __init__(self):
        self.limiters: Dict[str, RateLimiter] = {}

    def get_limiter(self, endpoint: str, config: Optional[RateLimitConfig] = None) -> RateLimiter:
        """Get or create a rate limiter for an endpoint."""
        if endpoint not in self.limiters:
            self.limiters[endpoint] = RateLimiter(config)
        return self.limiters[endpoint]


# Pre-configured rate limit settings for different endpoints
PRICING_RATE_LIMIT = RateLimitConfig(
    requests_per_minute=20,
    requests_per_hour=200,
    burst_limit=5,
    burst_window_seconds=10
)

UPLOAD_RATE_LIMIT = RateLimitConfig(
    requests_per_minute=5,
    requests_per_hour=50,
    burst_limit=2,
    burst_window_seconds=30
)

CONFIG_RATE_LIMIT = RateLimitConfig(
    requests_per_minute=60,
    requests_per_hour=500,
    burst_limit=10,
    burst_window_seconds=10
)


# Dependency for use in FastAPI routes
async def check_pricing_rate_limit(request: Request):
    """Dependency to check rate limit for pricing endpoints."""
    limiter = RateLimiter(PRICING_RATE_LIMIT)
    allowed, error_message, retry_after = limiter.check_rate_limit(request)

    if not allowed:
        raise HTTPException(
            status_code=429,
            detail={
                "error": True,
                "message": error_message,
                "retry_after": retry_after
            },
            headers={"Retry-After": str(retry_after) if retry_after else "60"}
        )

    return True


async def check_upload_rate_limit(request: Request):
    """Dependency to check rate limit for upload endpoints."""
    limiter = RateLimiter(UPLOAD_RATE_LIMIT)
    allowed, error_message, retry_after = limiter.check_rate_limit(request)

    if not allowed:
        raise HTTPException(
            status_code=429,
            detail={
                "error": True,
                "message": error_message,
                "retry_after": retry_after
            },
            headers={"Retry-After": str(retry_after) if retry_after else "60"}
        )

    return True
