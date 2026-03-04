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
        className={`relative flex items-center justify-center overflow-hidden ${fallbackClassName || className}`}
        style={{
          width: props.width,
          height: props.height,
          background:
            'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--card)) 100%)',
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
          <ImageOff size={24} className="opacity-40" />
          <span className="text-xs opacity-40 font-mono">{alt || 'Image'}</span>
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
