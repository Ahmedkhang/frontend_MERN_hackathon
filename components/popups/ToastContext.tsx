"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "./Toast";

type ToastType = "success" | "error" | "info" | "warning";
type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
  showSuccess: (message: string, options?: Omit<ToastOptions, "type">) => void;
  showError: (message: string, options?: Omit<ToastOptions, "type">) => void;
  showInfo: (message: string, options?: Omit<ToastOptions, "type">) => void;
  showWarning: (message: string, options?: Omit<ToastOptions, "type">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = "top-right",
}) => {
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; options: ToastOptions }>
  >([]);

  const showToast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, message, options: options || {} }]);
    },
    []
  );

  const showSuccess = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">) => {
      showToast(message, { ...options, type: "success" });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">) => {
      showToast(message, { ...options, type: "error" });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">) => {
      showToast(message, { ...options, type: "info" });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">) => {
      showToast(message, { ...options, type: "warning" });
    },
    [showToast]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{ showToast, showSuccess, showError, showInfo, showWarning }}
    >
      {children}
      <div>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.options.type}
            duration={toast.options.duration}
            position={toast.options.position || defaultPosition}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
