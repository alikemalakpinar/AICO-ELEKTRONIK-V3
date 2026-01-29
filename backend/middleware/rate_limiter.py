"""
Rate limiting middleware for FastAPI.
Supports Redis-backed distributed rate limiting for horizontal scaling,
with automatic fallback to in-memory storage for local development.

Architecture:
  - Production: Redis sorted sets for sliding window counters (stateless services)
  - Development: In-memory defaultdict (single process, no persistence)
  - Graceful degradation: If Redis connection fails, falls back to in-memory
"""

from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import time
from collections import defaultdict
from typing import Dict, Tuple, Optional, Protocol
import asyncio
from dataclasses import dataclass, field
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


@dataclass
class RateLimitConfig:
    """Configuration for rate limiting"""
    requests_per_minute: int = 20
    requests_per_hour: int = 200
    burst_limit: int = 5
    burst_window_seconds: int = 10
    whitelist_ips: list = field(default_factory=lambda: ["127.0.0.1", "::1"])
    blacklist_ips: list = field(default_factory=list)


class RateLimitBackend(Protocol):
    """Protocol for rate limit storage backends."""

    async def record_request(self, key: str, window_seconds: int) -> int:
        """Record a request and return the count within the window."""
        ...

    async def get_count(self, key: str, window_seconds: int) -> int:
        """Get current request count within the window."""
        ...


class InMemoryBackend:
    """
    In-memory rate limit backend.
    Suitable for single-process development only.
    WARNING: State is lost on restart, not shared across workers.
    """

    def __init__(self) -> None:
        self._requests: Dict[str, list[float]] = defaultdict(list)

    async def record_request(self, key: str, window_seconds: int) -> int:
        current_time = time.time()
        cutoff = current_time - window_seconds
        self._requests[key] = [ts for ts in self._requests[key] if ts > cutoff]
        self._requests[key].append(current_time)
        return len(self._requests[key])

    async def get_count(self, key: str, window_seconds: int) -> int:
        current_time = time.time()
        cutoff = current_time - window_seconds
        self._requests[key] = [ts for ts in self._requests[key] if ts > cutoff]
        return len(self._requests[key])

    async def cleanup(self) -> None:
        """Remove expired entries to prevent memory leaks."""
        current_time = time.time()
        hour_cutoff = current_time - 3600
        for key in list(self._requests.keys()):
            self._requests[key] = [ts for ts in self._requests[key] if ts > hour_cutoff]
            if not self._requests[key]:
                del self._requests[key]


class RedisBackend:
    """
    Redis-backed rate limit backend using sorted sets.
    Supports horizontal scaling — all instances share state.

    Each rate limit window uses a Redis sorted set:
      Key: "rl:{ip}:{window}"
      Score: timestamp
      Member: unique request ID (timestamp with microseconds)

    TTL is set to window_seconds + 1 to auto-expire old keys.
    """

    def __init__(self, redis_url: str) -> None:
        self._redis_url = redis_url
        self._redis = None
        self._connected = False

    async def _get_redis(self):
        """Lazy-initialize Redis connection."""
        if self._redis is None:
            try:
                import redis.asyncio as aioredis
                self._redis = aioredis.from_url(
                    self._redis_url,
                    encoding="utf-8",
                    decode_responses=True,
                    socket_connect_timeout=2,
                    socket_timeout=2,
                    retry_on_timeout=True,
                )
                await self._redis.ping()
                self._connected = True
                logger.info("Redis rate limiter connected successfully")
            except Exception as e:
                logger.warning(f"Redis connection failed for rate limiter: {e}")
                self._redis = None
                self._connected = False
                raise
        return self._redis

    async def record_request(self, key: str, window_seconds: int) -> int:
        redis = await self._get_redis()
        current_time = time.time()
        cutoff = current_time - window_seconds
        member = f"{current_time:.6f}"

        pipe = redis.pipeline()
        # Remove expired entries
        pipe.zremrangebyscore(key, "-inf", cutoff)
        # Add new request
        pipe.zadd(key, {member: current_time})
        # Count requests in window
        pipe.zcard(key)
        # Set TTL to auto-expire
        pipe.expire(key, window_seconds + 1)
        results = await pipe.execute()

        return results[2]  # zcard result

    async def get_count(self, key: str, window_seconds: int) -> int:
        redis = await self._get_redis()
        current_time = time.time()
        cutoff = current_time - window_seconds

        pipe = redis.pipeline()
        pipe.zremrangebyscore(key, "-inf", cutoff)
        pipe.zcard(key)
        results = await pipe.execute()

        return results[1]

    async def cleanup(self) -> None:
        """Redis handles TTL-based cleanup automatically."""
        pass

    async def close(self) -> None:
        """Close Redis connection."""
        if self._redis:
            await self._redis.close()


def create_backend(redis_url: Optional[str] = None) -> InMemoryBackend | RedisBackend:
    """
    Factory for rate limit backend.
    Uses Redis if REDIS_URL is configured, otherwise falls back to in-memory.
    """
    if redis_url:
        logger.info(f"Using Redis-backed rate limiter")
        return RedisBackend(redis_url)
    logger.info("Using in-memory rate limiter (development mode)")
    return InMemoryBackend()


class RateLimiter:
    """
    Sliding window rate limiter with multiple time windows.
    Backend-agnostic: works with both Redis and in-memory storage.
    """

    def __init__(
        self,
        config: Optional[RateLimitConfig] = None,
        backend: Optional[InMemoryBackend | RedisBackend] = None,
    ):
        self.config = config or RateLimitConfig()
        self._backend = backend or InMemoryBackend()
        self._fallback_backend = InMemoryBackend()

    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP from request, handling proxies."""
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()

        real_ip = request.headers.get("X-Real-IP")
        if real_ip:
            return real_ip.strip()

        if request.client:
            return request.client.host

        return "unknown"

    async def _backend_with_fallback(self, key: str, window: int, record: bool = False) -> int:
        """Use primary backend with fallback to in-memory on failure."""
        try:
            if record:
                return await self._backend.record_request(key, window)
            return await self._backend.get_count(key, window)
        except Exception:
            # Graceful degradation: fall back to in-memory
            if record:
                return await self._fallback_backend.record_request(key, window)
            return await self._fallback_backend.get_count(key, window)

    async def check_rate_limit(self, request: Request) -> Tuple[bool, Optional[str], Optional[int]]:
        """
        Check if request should be rate limited.

        Returns:
            Tuple of (allowed, error_message, retry_after_seconds)
        """
        ip = self._get_client_ip(request)

        # Check whitelist
        if ip in self.config.whitelist_ips:
            return True, None, None

        # Check blacklist
        if ip in self.config.blacklist_ips:
            return False, "IP address blocked", None

        # Check burst limit
        burst_key = f"rl:{ip}:burst"
        burst_count = await self._backend_with_fallback(burst_key, self.config.burst_window_seconds)
        if burst_count >= self.config.burst_limit:
            return False, "Too many requests. Please slow down.", self.config.burst_window_seconds

        # Check per-minute limit
        minute_key = f"rl:{ip}:min"
        minute_count = await self._backend_with_fallback(minute_key, 60)
        if minute_count >= self.config.requests_per_minute:
            return False, f"Rate limit exceeded. Maximum {self.config.requests_per_minute} requests per minute.", 60

        # Check per-hour limit
        hour_key = f"rl:{ip}:hour"
        hour_count = await self._backend_with_fallback(hour_key, 3600)
        if hour_count >= self.config.requests_per_hour:
            return False, f"Hourly limit exceeded. Maximum {self.config.requests_per_hour} requests per hour.", 3600

        # Record the request across all windows
        await self._backend_with_fallback(burst_key, self.config.burst_window_seconds, record=True)
        await self._backend_with_fallback(minute_key, 60, record=True)
        await self._backend_with_fallback(hour_key, 3600, record=True)

        return True, None, None

    async def get_remaining_requests(self, request: Request) -> Dict[str, int]:
        """Get remaining request counts for an IP."""
        ip = self._get_client_ip(request)

        minute_count = await self._backend_with_fallback(f"rl:{ip}:min", 60)
        hour_count = await self._backend_with_fallback(f"rl:{ip}:hour", 3600)

        return {
            "remaining_per_minute": max(0, self.config.requests_per_minute - minute_count),
            "remaining_per_hour": max(0, self.config.requests_per_hour - hour_count),
            "reset_minute": 60,
            "reset_hour": 3600
        }


class RateLimitMiddleware(BaseHTTPMiddleware):
    """FastAPI middleware for rate limiting with Redis support."""

    def __init__(
        self,
        app,
        config: Optional[RateLimitConfig] = None,
        redis_url: Optional[str] = None,
        exclude_paths: Optional[list] = None,
    ):
        super().__init__(app)
        backend = create_backend(redis_url)
        self.limiter = RateLimiter(config, backend)
        self.exclude_paths = exclude_paths or [
            "/api/v1/health",
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
        allowed, error_message, retry_after = await self.limiter.check_rate_limit(request)

        if not allowed:
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
        remaining = await self.limiter.get_remaining_requests(request)
        response.headers["X-RateLimit-Limit"] = str(self.limiter.config.requests_per_minute)
        response.headers["X-RateLimit-Remaining"] = str(remaining["remaining_per_minute"])
        response.headers["X-RateLimit-Reset"] = str(remaining["reset_minute"])

        return response


# =====================================================
# ENDPOINT-SPECIFIC RATE LIMITERS
# =====================================================

class EndpointRateLimiter:
    """Rate limiter for specific endpoints with different limits."""

    def __init__(self, redis_url: Optional[str] = None):
        self._redis_url = redis_url
        self.limiters: Dict[str, RateLimiter] = {}

    def get_limiter(self, endpoint: str, config: Optional[RateLimitConfig] = None) -> RateLimiter:
        """Get or create a rate limiter for an endpoint."""
        if endpoint not in self.limiters:
            backend = create_backend(self._redis_url)
            self.limiters[endpoint] = RateLimiter(config, backend)
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
async def check_pricing_rate_limit(request: Request) -> bool:
    """Dependency to check rate limit for pricing endpoints."""
    limiter = RateLimiter(PRICING_RATE_LIMIT)
    allowed, error_message, retry_after = await limiter.check_rate_limit(request)

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


async def check_upload_rate_limit(request: Request) -> bool:
    """Dependency to check rate limit for upload endpoints."""
    limiter = RateLimiter(UPLOAD_RATE_LIMIT)
    allowed, error_message, retry_after = await limiter.check_rate_limit(request)

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
