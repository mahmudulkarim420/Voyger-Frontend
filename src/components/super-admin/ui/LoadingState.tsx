"use client";

import React from "react";

interface LoadingStateProps {
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ rows = 5 }) => {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200/70 p-6 shadow-sm space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200/60 rounded-xl w-1/4 mb-6" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gray-200/70 flex-shrink-0" />
            <div className="space-y-1.5 flex-1 max-w-xs">
              <div className="h-3.5 bg-gray-200/70 rounded-md w-3/4" />
              <div className="h-2.5 bg-gray-200/50 rounded-md w-1/2" />
            </div>
          </div>
          <div className="h-4 bg-gray-200/60 rounded-md w-20" />
          <div className="h-4 bg-gray-200/60 rounded-md w-16" />
        </div>
      ))}
    </div>
  );
};
