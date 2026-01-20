"""
Application Configuration with Pydantic Settings.
Provides type-safe environment variable management with validation.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
from typing import List, Optional
from functools import lru_cache
import os


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    All settings are validated at startup.
    """

    # ============================================
    # Database Settings
    # ============================================
    MONGO_URL: str = Field(
        default="mongodb://localhost:27017",
        description="MongoDB connection URL"
    )
    DB_NAME: str = Field(
        default="aico_db",
        description="MongoDB database name"
    )

    # ============================================
    # Redis Settings (Optional)
    # ============================================
    REDIS_URL: Optional[str] = Field(
        default=None,
        description="Redis connection URL for caching"
    )

    # ============================================
    # Security Settings
    # ============================================
    SECRET_KEY: str = Field(
        default="unsafe-secret-key-change-me-in-production",
        description="Secret key for JWT and encryption"
    )
    ADMIN_API_KEY: Optional[str] = Field(
        default=None,
        description="API key for admin endpoints. Required for production."
    )
    CORS_ORIGINS: List[str] = Field(
        default=["http://localhost:3000"],
        description="Allowed CORS origins"
    )

    # ============================================
    # Application Settings
    # ============================================
    ENVIRONMENT: str = Field(
        default="development",
        description="Application environment (development/staging/production)"
    )
    DEBUG: bool = Field(
        default=False,
        description="Enable debug mode"
    )
    LOG_LEVEL: str = Field(
        default="INFO",
        description="Logging level"
    )

    # ============================================
    # File Upload Settings
    # ============================================
    UPLOAD_DIR: str = Field(
        default="/tmp/aico-uploads",
        description="Directory for file uploads"
    )
    MAX_UPLOAD_SIZE: int = Field(
        default=50 * 1024 * 1024,  # 50MB
        description="Maximum file upload size in bytes"
    )

    # ============================================
    # S3 Settings (Optional)
    # ============================================
    S3_BUCKET: Optional[str] = Field(
        default=None,
        description="S3 bucket name for file storage"
    )
    S3_REGION: str = Field(
        default="eu-central-1",
        description="AWS S3 region"
    )
    AWS_ACCESS_KEY_ID: Optional[str] = Field(
        default=None,
        description="AWS access key"
    )
    AWS_SECRET_ACCESS_KEY: Optional[str] = Field(
        default=None,
        description="AWS secret key"
    )

    # ============================================
    # Rate Limiting Settings
    # ============================================
    RATE_LIMIT_REQUESTS_PER_MINUTE: int = Field(
        default=20,
        description="Maximum API requests per minute"
    )
    RATE_LIMIT_REQUESTS_PER_HOUR: int = Field(
        default=200,
        description="Maximum API requests per hour"
    )

    # ============================================
    # Email Settings (Optional)
    # ============================================
    SMTP_HOST: Optional[str] = Field(default=None)
    SMTP_PORT: int = Field(default=587)
    SMTP_USER: Optional[str] = Field(default=None)
    SMTP_PASSWORD: Optional[str] = Field(default=None)
    EMAIL_FROM: str = Field(default="noreply@aicoelektronik.com")

    # ============================================
    # Validators
    # ============================================
    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        """Parse CORS origins from comma-separated string or list"""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',') if origin.strip()]
        return v

    @field_validator('ENVIRONMENT')
    @classmethod
    def validate_environment(cls, v):
        """Validate environment value"""
        allowed = ['development', 'staging', 'production', 'testing']
        if v.lower() not in allowed:
            raise ValueError(f"Environment must be one of: {allowed}")
        return v.lower()

    @field_validator('LOG_LEVEL')
    @classmethod
    def validate_log_level(cls, v):
        """Validate log level"""
        allowed = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']
        if v.upper() not in allowed:
            raise ValueError(f"Log level must be one of: {allowed}")
        return v.upper()

    @field_validator('SECRET_KEY')
    @classmethod
    def validate_secret_key(cls, v, info):
        """Warn if using default secret key in production"""
        # Access other values through info.data if needed
        if 'unsafe' in v.lower():
            import warnings
            warnings.warn(
                "Using default SECRET_KEY. Set a strong secret in production!",
                UserWarning
            )
        return v

    # ============================================
    # Properties
    # ============================================
    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == 'production'

    @property
    def is_development(self) -> bool:
        return self.ENVIRONMENT == 'development'

    @property
    def s3_enabled(self) -> bool:
        return bool(self.S3_BUCKET and self.AWS_ACCESS_KEY_ID and self.AWS_SECRET_ACCESS_KEY)

    @property
    def redis_enabled(self) -> bool:
        return bool(self.REDIS_URL)

    # ============================================
    # Pydantic Config
    # ============================================
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"  # Ignore extra env vars
    )


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to avoid reading .env file on every request.
    """
    return Settings()


# Global settings instance
settings = get_settings()


# ============================================
# Logging Configuration
# ============================================
import logging
import sys

def setup_logging():
    """Configure application logging based on settings"""
    log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    if settings.is_production:
        # JSON format for production (easier to parse in log aggregators)
        log_format = '{"time": "%(asctime)s", "name": "%(name)s", "level": "%(levelname)s", "message": "%(message)s"}'

    logging.basicConfig(
        level=getattr(logging, settings.LOG_LEVEL),
        format=log_format,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

    # Reduce noise from third-party loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("motor").setLevel(logging.WARNING)

    return logging.getLogger("aico")


logger = setup_logging()
