import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

/**
 * Skeleton component with Clean Industrial Design
 * - Consistent with design system colors
 * - Professional animation
 * - Various preset variants
 */
const Skeleton = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-muted",
    primary: "bg-navy-100 dark:bg-navy-800",
    card: "bg-muted rounded-lg",
    text: "bg-muted h-4 rounded",
    title: "bg-muted h-6 rounded",
    price: "bg-muted h-8 w-24 rounded",
    avatar: "bg-muted rounded-full",
    button: "bg-muted h-9 rounded",
    image: "bg-muted rounded-lg aspect-video",
    input: "bg-muted h-9 rounded",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "animate-pulse",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Skeleton.displayName = "Skeleton";

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "default", "primary", "card", "text", "title",
    "price", "avatar", "button", "image", "input"
  ]),
};

/**
 * SkeletonCard - Card placeholder
 */
const SkeletonCard = ({ className }) => (
  <div className={cn("p-6 rounded-lg border border-border bg-card", className)}>
    <Skeleton variant="avatar" className="w-10 h-10 mb-4" />
    <Skeleton variant="title" className="w-3/4 mb-3" />
    <Skeleton variant="text" className="w-full mb-2" />
    <Skeleton variant="text" className="w-5/6 mb-2" />
    <Skeleton variant="text" className="w-2/3" />
  </div>
);

SkeletonCard.propTypes = {
  className: PropTypes.string,
};

/**
 * SkeletonQuoteResult - Quote result placeholder for InstantQuotePage
 */
const SkeletonQuoteResult = ({ className }) => (
  <div className={cn("space-y-4", className)}>
    {/* Summary Card */}
    <div className="p-6 rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between mb-6">
        <Skeleton variant="title" className="w-32" />
        <Skeleton className="w-24 h-9 rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-3 rounded bg-secondary/50">
            <Skeleton variant="text" className="w-16 mb-2" />
            <Skeleton variant="price" className="w-20" />
          </div>
        ))}
      </div>
    </div>

    {/* Breakdown Card */}
    <div className="p-6 rounded-lg border border-border bg-card">
      <Skeleton variant="title" className="w-40 mb-4" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <Skeleton variant="avatar" className="w-8 h-8" />
              <Skeleton variant="text" className="w-28" />
            </div>
            <Skeleton variant="text" className="w-16" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

SkeletonQuoteResult.propTypes = {
  className: PropTypes.string,
};

/**
 * SkeletonProductGrid - Grid of card placeholders
 */
const SkeletonProductGrid = ({ count = 6, className }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
    {[...Array(count)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

SkeletonProductGrid.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
};

/**
 * SkeletonTable - Table placeholder
 */
const SkeletonTable = ({ rows = 5, cols = 4, className }) => (
  <div className={cn("rounded-lg border border-border overflow-hidden", className)}>
    {/* Header */}
    <div className="bg-secondary p-4 border-b border-border">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} variant="text" className="h-4" />
        ))}
      </div>
    </div>
    {/* Rows */}
    {[...Array(rows)].map((_, rowIdx) => (
      <div key={rowIdx} className="p-4 border-b border-border last:border-0">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {[...Array(cols)].map((_, colIdx) => (
            <Skeleton key={colIdx} variant="text" className="h-4" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

SkeletonTable.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
  className: PropTypes.string,
};

/**
 * SkeletonHero - Hero section placeholder
 */
const SkeletonHero = ({ className }) => (
  <div className={cn("py-16 px-4", className)}>
    <div className="max-w-4xl mx-auto text-center space-y-4">
      <Skeleton className="w-24 h-6 rounded-full mx-auto" />
      <Skeleton variant="title" className="w-3/4 h-10 mx-auto" />
      <Skeleton variant="title" className="w-1/2 h-10 mx-auto" />
      <Skeleton variant="text" className="w-2/3 h-5 mx-auto mt-4" />
      <div className="flex gap-4 justify-center mt-6">
        <Skeleton variant="button" className="w-32" />
        <Skeleton variant="button" className="w-32" />
      </div>
    </div>
  </div>
);

SkeletonHero.propTypes = {
  className: PropTypes.string,
};

/**
 * SkeletonForm - Form fields placeholder
 */
const SkeletonForm = ({ fields = 4, className }) => (
  <div className={cn("space-y-4", className)}>
    {[...Array(fields)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton variant="text" className="w-20 h-3" />
        <Skeleton variant="input" className="w-full" />
      </div>
    ))}
    <Skeleton variant="button" className="w-full mt-4" />
  </div>
);

SkeletonForm.propTypes = {
  fields: PropTypes.number,
  className: PropTypes.string,
};

/**
 * SkeletonPriceDisplay - Price display placeholder
 */
const SkeletonPriceDisplay = ({ className }) => (
  <div className={cn("space-y-2", className)}>
    <Skeleton variant="text" className="w-16 h-3" />
    <Skeleton className="w-32 h-10 rounded" />
    <Skeleton variant="text" className="w-24 h-3" />
  </div>
);

SkeletonPriceDisplay.propTypes = {
  className: PropTypes.string,
};

export {
  Skeleton,
  SkeletonCard,
  SkeletonQuoteResult,
  SkeletonProductGrid,
  SkeletonTable,
  SkeletonHero,
  SkeletonForm,
  SkeletonPriceDisplay
};
