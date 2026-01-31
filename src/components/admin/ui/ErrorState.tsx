"use client";

import { AlertTriangle, RefreshCw, XCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
  variant?: "error" | "warning" | "info";
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
  className = "",
  variant = "error",
}: ErrorStateProps) {
  const variantStyles = {
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-500",
      text: "text-red-800",
      button: "bg-red-100 hover:bg-red-200 text-red-700",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "text-yellow-500",
      text: "text-yellow-800",
      button: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-500",
      text: "text-blue-800",
      button: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
  };

  const styles = variantStyles[variant];
  const Icon = variant === "error" ? XCircle : AlertTriangle;

  return (
    <div
      className={`${styles.bg} ${styles.border} border rounded-lg p-6 ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        <Icon className={`h-10 w-10 ${styles.icon} mb-3`} />
        <p className={`${styles.text} font-medium`}>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${styles.button} transition-colors`}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title = "No data found",
  message = "There are no items to display.",
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
