"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "./loaders/Skeleton";

interface ImageWithFallbackProps extends ImageProps {
  fallbackClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  ...props
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden w-full h-full ${fallbackClassName || ""}`}>
      {isLoading && (
        <Skeleton
          className={`absolute inset-0 z-10 w-full h-full rounded-none scale-105 ${fallbackClassName || ""}`}
        />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        className={`transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className || ""}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
