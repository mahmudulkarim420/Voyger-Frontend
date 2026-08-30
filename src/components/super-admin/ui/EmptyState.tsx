"use client";

import React from "react";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items found",
  description = "There are no records matching your request.",
  actionLabel,
  actionHref,
  onAction,
  icon: Icon = FolderOpen,
}) => {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200/70 p-12 text-center shadow-sm flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100/80 text-gray-400 flex items-center justify-center mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-base font-bold text-[#3A322B] mb-1">{title}</h3>
      <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">{description}</p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs inline-block"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && !actionHref && (
        <button
          onClick={onAction}
          className="bg-[#B37068] hover:bg-[#9c6059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
