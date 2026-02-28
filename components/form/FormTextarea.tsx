"use client";

import React, { TextareaHTMLAttributes, forwardRef } from "react";

export interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      name,
      label,
      error,
      touched,
      value,
      onChange,
      onBlur,
      className = "",
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const showError = touched && error;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={name}
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          rows={rows}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 ${
            showError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"
          }`}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? `${name}-error` : undefined}
          {...props}
        />
        {showError && (
          <span id={`${name}-error`} className="block text-sm text-red-600 mt-1" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
