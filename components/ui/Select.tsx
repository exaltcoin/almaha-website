import { SelectHTMLAttributes, forwardRef } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, id, options, placeholder, className = "", ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-navy-700">
          {label}
        </label>
        <select
          ref={ref}
          id={inputId}
          className={`rounded-sm border bg-white px-4 py-2.5 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
            error ? "border-red-400" : "border-navy-100"
          } ${className}`}
          aria-invalid={Boolean(error)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
