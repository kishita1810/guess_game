
import { cn } from '@/lib/utils';
import React from 'react';

interface NeuroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const NeuroButton = React.forwardRef<HTMLButtonElement, NeuroButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, glowColor, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-primary/90 hover:bg-primary focus:ring-primary/50 btn-shine',
      secondary: 'bg-secondary/90 hover:bg-secondary focus:ring-secondary/50 btn-shine',
      accent: 'bg-accent/90 hover:bg-accent focus:ring-accent/50 btn-shine',
      destructive: 'bg-destructive/90 hover:bg-destructive focus:ring-destructive/50 btn-shine',
      minimal: 'bg-transparent hover:bg-white/10 focus:ring-white/20 border border-white/20',
    };

    const sizeStyles = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-5 py-2',
      lg: 'px-8 py-3 text-lg',
    };

    const glow = glowColor || {
      primary: 'rgba(14, 165, 233, 0.7)',
      secondary: 'rgba(155, 135, 245, 0.7)',
      accent: 'rgba(34, 211, 238, 0.7)',
      destructive: 'rgba(239, 68, 68, 0.7)',
      minimal: 'rgba(255, 255, 255, 0.1)',
    }[variant];

    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-medium tracking-wide rounded-lg',
          'transition-all duration-200 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
          'active:scale-95',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        style={{ 
          '--glow-color': glow
        } as React.CSSProperties}
        {...props}
      >
        <span className={cn(
          'relative z-10',
          variant !== 'minimal' && 'text-white',
          variant === 'minimal' && 'text-white/80'
        )}>
          {children}
        </span>
      </button>
    );
  }
);

NeuroButton.displayName = 'NeuroButton';

export default NeuroButton;
