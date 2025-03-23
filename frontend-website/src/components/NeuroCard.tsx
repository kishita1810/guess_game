
import { cn } from '@/lib/utils';
import React from 'react';

interface NeuroCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
  onClick?: () => void;
}

const NeuroCard: React.FC<NeuroCardProps> = ({
  children,
  className,
  glowColor = 'rgba(14, 165, 233, 0.5)',
  interactive = false,
  onClick
}) => {
  return (
    <div 
      className={cn(
        'glass rounded-xl p-6 transition-all duration-300',
        interactive && 'cursor-pointer card-hover',
        className
      )}
      style={{ '--glow-color': glowColor } as React.CSSProperties}
      onClick={interactive ? onClick : undefined}
    >
      {children}
    </div>
  );
};

export default NeuroCard;
