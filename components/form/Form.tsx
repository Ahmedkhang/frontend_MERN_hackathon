"use client";

import React, { useState, useCallback, ReactNode, FormEvent } from "react";

export interface FormErrors {
  [key: string]: string;
}

export interface FormProps<T extends Record<string, unknown>> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validate?: (values: T) => FormErrors;
  children: ReactNode;
  className?: string;
}

export function Form<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  validate,
  children,
  className = "",
}: FormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (field: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (touched[field] && validate) {
        const validationErrors = validate({ ...values, [field]: value });
        setErrors(validationErrors);
      }
    },
    [touched, validate, values]
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
      }
    },
    [validate, values]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let validationErrors: FormErrors = {};
    if (validate) {
      validationErrors = validate(values);
      setErrors(validationErrors);
      setTouched(
        Object.keys(values).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {} as Record<keyof T, boolean>
        )
      );
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childType = child.type as React.FC<unknown> & { displayName?: string };
          const formFieldTypes = ["FormInput", "FormSelect", "FormTextarea", "FormSubmitButton"];
          
          if (formFieldTypes.includes(childType.displayName || "")) {
            return React.cloneElement(child as React.ReactElement<FormFieldProps<T>>, {
              value: values[child.props.name as keyof T],
              onChange: (value: unknown) => handleChange(child.props.name as keyof T, value),
              onBlur: () => handleBlur(child.props.name as keyof T),
              error: errors[child.props.name as string],
              touched: touched[child.props.name as keyof T],
              disabled: isSubmitting || child.props.disabled,
            } as Partial<FormFieldProps<T>>);
          }
        }
        return child;
      })}
    </form>
  );
}

interface FormFieldProps<T> {
  name: keyof T;
  value?: unknown;
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

// Attach displayName for identification
(Form as React.FC<FormProps<Record<string, unknown>>> & { displayName?: string }).displayName = "Form";
