"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;

    const timeout = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-x-4 bottom-6 z-50 mx-auto w-fit max-w-md rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
    >
      <div className="flex items-center gap-4">
        <p>{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss error"
          className="text-lg leading-none"
        >
          x
        </button>
      </div>
    </div>
  );
}
