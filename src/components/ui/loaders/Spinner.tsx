import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

export function Spinner({ size = 24, className, color = "currentColor", ...props }: SpinnerProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 animate-[spin_3s_linear_infinite]"
        {...props}
      >
        <defs>
          <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="70%" stopColor={color} stopOpacity="0.1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer subtle ring */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity="0.15"
        />

        {/* Animated fluid ring */}
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="url(#premium-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="20"
          className="animate-[spin_1.5s_cubic-bezier(0.5,0,0.5,1)_infinite_reverse]"
          style={{ transformOrigin: "center" }}
        />
      </svg>
      {/* Inner accent diamond */}
      <div
        className="absolute bg-current opacity-70 animate-[pulse_1.5s_ease-in-out_infinite]"
        style={{ width: size * 0.15, height: size * 0.15, transform: "rotate(45deg)" }}
      />
    </div>
  );
}
