"use client";

import React, { useState } from "react";
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
  priority, // priority প্রপসটি আলাদা করে নিচ্ছি
  ...props
}: ImageWithFallbackProps) {
  // যদি priority থাকে, তবে ডিফল্টভাবেই isLoading হবে false (অ্যানিমেশন এড়ানোর জন্য)
  const [isLoading, setIsLoading] = useState(!priority);

  return (
    <div className={`relative overflow-hidden w-full h-full ${fallbackClassName || ""}`}>
      {/* priority না থাকলে তবেই Skeleton দেখাবে */}
      {isLoading && !priority && (
        <Skeleton
          className={`absolute inset-0 z-10 w-full h-full rounded-none scale-105 ${fallbackClassName || ""}`}
        />
      )}
      <Image
        {...props}
        priority={priority} // Next.js Image-এ priority পাস করে দিলাম
        src={src}
        alt={alt}
        className={`${
          priority
            ? "opacity-100" // Priority ইমেজের জন্য কোনো ট্রানজিশন বা লেটেন্সি থাকবে না
            : `transition-opacity duration-700 ease-in-out ${
                isLoading ? "opacity-0" : "opacity-100"
              }`
        } ${className || ""}`}
        onLoad={() => {
          if (!priority) setIsLoading(false);
        }}
      />
    </div>
  );
}