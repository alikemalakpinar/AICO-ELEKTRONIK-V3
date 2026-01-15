import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils"

/**
 * Button variants using Clean Industrial Design System
 * - Smaller border radius (4px default)
 * - Professional color palette
 * - Brand orange for CTAs
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Navy Blue
        default:
          "bg-navy-900 text-white shadow-sm hover:bg-navy-800 hover:shadow-button-hover",
        // Brand - Orange CTA
        brand:
          "bg-brand-500 text-white shadow-sm hover:bg-brand-600 hover:shadow-button-hover",
        // Destructive - Red
        destructive:
          "bg-error-500 text-white shadow-sm hover:bg-error-600",
        // Outline - Border only
        outline:
          "border border-border bg-transparent shadow-sm hover:bg-secondary hover:border-navy-300",
        // Secondary - Light background
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        // Ghost - No background
        ghost:
          "hover:bg-secondary hover:text-foreground",
        // Link - Text only
        link:
          "text-brand-500 underline-offset-4 hover:underline hover:text-brand-600",
        // Success - Green
        success:
          "bg-success-500 text-white shadow-sm hover:bg-success-600",
        // Warning - Amber
        warning:
          "bg-warning-500 text-white shadow-sm hover:bg-warning-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base font-semibold",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Yükleniyor...</span>
        </>
      ) : props.children}
    </Comp>
  );
})
Button.displayName = "Button"

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "default", "brand", "destructive", "outline",
    "secondary", "ghost", "link", "success", "warning"
  ]),
  size: PropTypes.oneOf([
    "default", "sm", "lg", "xl", "icon", "icon-sm", "icon-lg"
  ]),
  asChild: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export { Button, buttonVariants }
