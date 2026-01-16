import * as React from "react"
import PropTypes from "prop-types";

import { cn } from "@/lib/utils"

/**
 * Card component with Clean Industrial Design
 * - Smaller border radius (8px = rounded-lg)
 * - Subtle shadow, no glass effect
 * - Professional hover states
 */
const Card = React.forwardRef(({
  className,
  variant = "default",
  hover = false,
  ...props
}, ref) => {
  const variants = {
    default: "bg-card border border-border shadow-card",
    elevated: "bg-card border border-border shadow-industrial-md",
    outline: "bg-transparent border border-border",
    ghost: "bg-transparent",
    interactive: "bg-card border border-border shadow-card cursor-pointer",
  };

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "rounded-lg text-card-foreground",
        // Variant
        variants[variant],
        // Hover effect
        hover && "transition-shadow duration-200 hover:shadow-card-hover",
        variant === "interactive" && "transition-all duration-200 hover:shadow-card-hover hover:border-navy-300",
        className
      )}
      {...props}
    />
  );
})
Card.displayName = "Card"

Card.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "elevated", "outline", "ghost", "interactive"]),
  hover: PropTypes.bool,
};

const CardHeader = React.forwardRef(({ className, compact = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5",
      compact ? "p-4" : "p-6",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

CardHeader.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
};

const CardTitle = React.forwardRef(({ className, as: Component = "h3", ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      "font-heading font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

CardTitle.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType,
};

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

CardDescription.propTypes = {
  className: PropTypes.string,
};

const CardContent = React.forwardRef(({ className, compact = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      compact ? "p-4 pt-0" : "p-6 pt-0",
      className
    )}
    {...props}
  />
))
CardContent.displayName = "CardContent"

CardContent.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
};

const CardFooter = React.forwardRef(({ className, compact = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center",
      compact ? "p-4 pt-0" : "p-6 pt-0",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

CardFooter.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
};

/**
 * CardSection - Divided section within a card
 */
const CardSection = React.forwardRef(({ className, title, description, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t border-border pt-6 mt-6 first:border-0 first:pt-0 first:mt-0", className)}
    {...props}
  >
    {(title || description) && (
      <div className="mb-4">
        {title && <h4 className="font-medium text-foreground">{title}</h4>}
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
    )}
    {children}
  </div>
))
CardSection.displayName = "CardSection"

CardSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

/**
 * PriceCard - Specialized card for displaying prices
 */
const PriceCard = React.forwardRef(({
  className,
  label,
  price,
  currency = "₺",
  period,
  highlight = false,
  ...props
}, ref) => (
  <Card
    ref={ref}
    variant={highlight ? "elevated" : "default"}
    className={cn(
      "p-4",
      highlight && "border-brand-500 ring-1 ring-brand-500/20",
      className
    )}
    {...props}
  >
    {label && (
      <span className="text-sm text-muted-foreground">{label}</span>
    )}
    <div className="flex items-baseline gap-1 mt-1">
      <span className="font-mono text-2xl font-bold text-brand-500 tabular-nums">
        {typeof price === 'number' ? price.toLocaleString('tr-TR') : price}
      </span>
      <span className="text-lg text-brand-500/80">{currency}</span>
      {period && (
        <span className="text-sm text-muted-foreground ml-1">/ {period}</span>
      )}
    </div>
  </Card>
))
PriceCard.displayName = "PriceCard"

PriceCard.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string,
  period: PropTypes.string,
  highlight: PropTypes.bool,
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardSection,
  PriceCard
}
