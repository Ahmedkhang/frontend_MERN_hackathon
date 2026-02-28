"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
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
      ...props
    },
    ref
  ) => {
    const showError = touched && error;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = props.type === "number" ? parseFloat(e.target.value) : e.target.value;
      onChange?.(val);
    };

    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
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

FormInput.displayName = "FormInput";
