
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface NeuroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const NeuroInput = forwardRef<HTMLInputElement, NeuroInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            className={cn(
              'w-full px-4 py-2 rounded-lg glass transition-all duration-200',
              'border border-white/10 focus:border-primary/50',
              'placeholder:text-white/30 text-white',
              'focus:outline-none focus:ring-2 focus:ring-primary/30',
              error && 'border-destructive/50 focus:ring-destructive/30',
              className
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <div className="mt-1 text-sm text-destructive">{error}</div>
          )}
        </div>
      </div>
    );
  }
);

NeuroInput.displayName = 'NeuroInput';

export default NeuroInput;
