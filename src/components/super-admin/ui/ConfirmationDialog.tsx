"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isDestructive?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  isDestructive = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">{message}</p>

        <div className="pt-2 flex gap-3 text-xs font-bold">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2.5 rounded-xl text-white transition-colors shadow-sm cursor-pointer ${
              isDestructive
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-[#B37068] hover:bg-[#9c6059]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
