import { forwardRef } from "react";

const Input = forwardRef(
  (
    { label, error, type = "text", required = false, className = "", ...props },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-farmer-primary"}
            ${className}
          `}
            required={required}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
