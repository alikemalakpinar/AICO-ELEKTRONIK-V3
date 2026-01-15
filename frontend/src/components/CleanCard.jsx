import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

/**
 * CleanCard - Industrial Design Card Component
 *
 * Clean, professional card with no glass effects.
 * Follows the Clean Industrial Design System.
 */
const CleanCard = ({
  children,
  className = '',
  hover = false,
  variant = 'default',
  padding = 'default',
  onClick,
  animate = false,
}) => {
  // Variant styles
  const variants = {
    default: 'bg-card border border-border shadow-card',
    elevated: 'bg-card border border-border shadow-industrial-md',
    outline: 'bg-transparent border border-border',
    ghost: 'bg-transparent',
    highlight: 'bg-card border border-brand-500 shadow-card ring-1 ring-brand-500/20',
    muted: 'bg-secondary border border-border',
  };

  // Padding options
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const Component = animate ? motion.div : 'div';

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        whileHover: hover ? { y: -4, transition: { duration: 0.2 } } : {},
      }
    : {};

  return (
    <Component
      onClick={onClick}
      className={cn(
        // Base styles
        'rounded-lg text-card-foreground',
        // Variant
        variants[variant],
        // Padding
        paddings[padding],
        // Hover effect
        hover && 'transition-all duration-200 hover:shadow-card-hover',
        // Clickable
        onClick && 'cursor-pointer',
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

CleanCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'elevated', 'outline', 'ghost', 'highlight', 'muted']),
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg']),
  onClick: PropTypes.func,
  animate: PropTypes.bool,
};

/**
 * CleanCardHeader - Card header section
 */
export const CleanCardHeader = ({ children, className = '', ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
    {children}
  </div>
);

CleanCardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * CleanCardTitle - Card title component
 */
export const CleanCardTitle = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component
    className={cn(
      'font-heading font-semibold text-foreground leading-none tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

CleanCardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

/**
 * CleanCardDescription - Card description text
 */
export const CleanCardDescription = ({ children, className = '', ...props }) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props}>
    {children}
  </p>
);

CleanCardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * CleanCardContent - Card main content
 */
export const CleanCardContent = ({ children, className = '', ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

CleanCardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * CleanCardFooter - Card footer section
 */
export const CleanCardFooter = ({ children, className = '', ...props }) => (
  <div className={cn('flex items-center pt-4', className)} {...props}>
    {children}
  </div>
);

CleanCardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * CleanCardDivider - Horizontal divider in card
 */
export const CleanCardDivider = ({ className = '' }) => (
  <div className={cn('border-t border-border my-4', className)} />
);

CleanCardDivider.propTypes = {
  className: PropTypes.string,
};

/**
 * Feature Card - For feature/benefit displays
 */
export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = '',
  hover = true,
}) => {
  return (
    <CleanCard
      hover={hover}
      animate
      className={cn('flex flex-col', className)}
    >
      {Icon && (
        <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-brand-500" />
        </div>
      )}
      <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </CleanCard>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
};

/**
 * StatCard - For statistics display
 */
export const StatCard = ({
  value,
  label,
  icon: Icon,
  trend,
  className = '',
}) => {
  const trendColors = {
    up: 'text-success-500',
    down: 'text-error-500',
    neutral: 'text-muted-foreground',
  };

  return (
    <CleanCard className={cn('', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl font-bold font-mono tabular-nums text-foreground">{value}</p>
          {trend && (
            <p className={cn('text-xs mt-1', trendColors[trend.direction])}>
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}{' '}
              {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
    </CleanCard>
  );
};

StatCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  trend: PropTypes.shape({
    direction: PropTypes.oneOf(['up', 'down', 'neutral']),
    value: PropTypes.string,
  }),
  className: PropTypes.string,
};

/**
 * PricingCard - For price displays
 */
export const PricingCard = ({
  label,
  price,
  currency = '₺',
  period,
  highlight = false,
  className = '',
}) => (
  <CleanCard
    variant={highlight ? 'highlight' : 'default'}
    className={className}
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
  </CleanCard>
);

PricingCard.propTypes = {
  label: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string,
  period: PropTypes.string,
  highlight: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * BentoGrid - Grid layout for cards
 */
export const BentoGrid = ({ children, className = '', columns = 3 }) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {children}
    </div>
  );
};

BentoGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  columns: PropTypes.oneOf([2, 3, 4]),
};

export default CleanCard;
