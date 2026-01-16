import * as React from "react"
import PropTypes from "prop-types";

import { cn } from "@/lib/utils"

/**
 * Input component with Clean Industrial Design
 * - Smaller border radius (4px)
 * - Professional focus states
 * - Support for technical/data inputs with mono font
 */
const Input = React.forwardRef(({
  className,
  type,
  variant = "default",
  ...props
}, ref) => {
  const variants = {
    default: "",
    // Technical input for dimensions, quantities
    technical: "font-mono tabular-nums tracking-tight",
    // Price input styling
    price: "font-mono tabular-nums text-right font-semibold",
    // Search input
    search: "pl-10",
  };

  return (
    <input
      type={type}
      className={cn(
        // Base styles
        "flex h-9 w-full rounded border border-input bg-background px-3 py-2",
        // Typography
        "text-sm text-foreground",
        // Placeholder
        "placeholder:text-muted-foreground",
        // Transitions
        "transition-all duration-200",
        // Focus states
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Variant styles
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Input.displayName = "Input"

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["default", "technical", "price", "search"]),
};

/**
 * InputGroup - Wraps input with label and optional elements
 */
const InputGroup = React.forwardRef(({
  className,
  label,
  description,
  error,
  required,
  children,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
      {label && (
        <label className="text-sm font-medium text-foreground flex items-center gap-1">
          {label}
          {required && <span className="text-error-500">*</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-error-500 flex items-center gap-1">
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
})
InputGroup.displayName = "InputGroup"

InputGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
};

/**
 * InputWithUnit - Input with a unit suffix (mm, pcs, etc.)
 */
const InputWithUnit = React.forwardRef(({
  className,
  unit,
  ...props
}, ref) => {
  return (
    <div className="relative">
      <Input
        ref={ref}
        className={cn("pr-12", className)}
        variant="technical"
        {...props}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-mono">
        {unit}
      </span>
    </div>
  );
})
InputWithUnit.displayName = "InputWithUnit"

InputWithUnit.propTypes = {
  className: PropTypes.string,
  unit: PropTypes.string.isRequired,
};

export { Input, InputGroup, InputWithUnit }
