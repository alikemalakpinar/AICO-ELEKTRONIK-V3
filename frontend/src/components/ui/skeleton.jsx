import * as React from "react";
import { cn } from "../../lib/utils";

const Skeleton = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-slate-200 dark:bg-slate-800",
    primary: "bg-blue-100 dark:bg-blue-900",
    card: "bg-slate-100 dark:bg-slate-900 rounded-2xl",
    text: "bg-slate-200 dark:bg-slate-800 h-4 rounded",
    title: "bg-slate-200 dark:bg-slate-800 h-8 rounded",
    avatar: "bg-slate-200 dark:bg-slate-800 rounded-full",
    button: "bg-slate-200 dark:bg-slate-800 h-12 rounded-xl",
    image: "bg-slate-200 dark:bg-slate-800 rounded-xl aspect-video",
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

// Pre-built skeleton patterns for common use cases
const SkeletonCard = ({ className }) => (
  <div className={cn("p-6 rounded-2xl border border-slate-200 bg-white", className)}>
    <Skeleton variant="avatar" className="w-12 h-12 mb-4" />
    <Skeleton variant="title" className="w-3/4 mb-3" />
    <Skeleton variant="text" className="w-full mb-2" />
    <Skeleton variant="text" className="w-5/6 mb-2" />
    <Skeleton variant="text" className="w-2/3" />
  </div>
);

const SkeletonQuoteResult = ({ className }) => (
  <div className={cn("space-y-6", className)}>
    {/* Summary Card */}
    <div className="p-6 rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between mb-6">
        <Skeleton variant="title" className="w-40" />
        <Skeleton className="w-32 h-10 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-50">
            <Skeleton variant="text" className="w-20 mb-2" />
            <Skeleton variant="title" className="w-24" />
          </div>
        ))}
      </div>
    </div>

    {/* Breakdown Card */}
    <div className="p-6 rounded-2xl border border-slate-200 bg-white">
      <Skeleton variant="title" className="w-48 mb-6" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Skeleton variant="avatar" className="w-8 h-8" />
              <Skeleton variant="text" className="w-32" />
            </div>
            <Skeleton variant="text" className="w-20" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkeletonProductGrid = ({ count = 6, className }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
    {[...Array(count)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const SkeletonTable = ({ rows = 5, cols = 4, className }) => (
  <div className={cn("rounded-xl border border-slate-200 overflow-hidden", className)}>
    {/* Header */}
    <div className="bg-slate-50 p-4 border-b border-slate-200">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} variant="text" className="h-5" />
        ))}
      </div>
    </div>
    {/* Rows */}
    {[...Array(rows)].map((_, rowIdx) => (
      <div key={rowIdx} className="p-4 border-b border-slate-100 last:border-0">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {[...Array(cols)].map((_, colIdx) => (
            <Skeleton key={colIdx} variant="text" className="h-4" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SkeletonHero = ({ className }) => (
  <div className={cn("py-20 px-4", className)}>
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <Skeleton className="w-32 h-8 rounded-full mx-auto" />
      <Skeleton variant="title" className="w-3/4 h-12 mx-auto" />
      <Skeleton variant="title" className="w-1/2 h-12 mx-auto" />
      <Skeleton variant="text" className="w-2/3 h-6 mx-auto" />
      <div className="flex gap-4 justify-center mt-8">
        <Skeleton variant="button" className="w-40" />
        <Skeleton variant="button" className="w-40" />
      </div>
    </div>
  </div>
);

export {
  Skeleton,
  SkeletonCard,
  SkeletonQuoteResult,
  SkeletonProductGrid,
  SkeletonTable,
  SkeletonHero
};
