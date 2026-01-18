'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackClassName?: string;
  showPlaceholder?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/assets/placeholder.png',
  fallbackClassName = '',
  showPlaceholder = true,
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError && showPlaceholder) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${fallbackClassName || className}`}
        style={{ width: props.width, height: props.height }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImageOff size={24} className="opacity-50" />
          <span className="text-xs opacity-50">{alt || 'Image'}</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}

// Skeleton placeholder for loading states
export function ImageSkeleton({
  width,
  height,
  className = '',
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-muted rounded-lg ${className}`}
      style={{ width, height }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-muted-foreground/10 animate-pulse" />
      </div>
    </div>
  );
}
