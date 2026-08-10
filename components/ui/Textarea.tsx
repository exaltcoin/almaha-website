import { TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, id, className = "", rows = 5, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-navy-700">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`rounded-sm border px-4 py-2.5 text-navy-900 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
            error ? "border-red-400" : "border-navy-100"
          } ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
