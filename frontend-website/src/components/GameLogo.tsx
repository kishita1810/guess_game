
import React from 'react';
import { cn } from '@/lib/utils';

interface GameLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GameLogo: React.FC<GameLogoProps> = ({ 
  className,
  size = 'lg'
}) => {
  const sizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-5xl',
    lg: 'text-5xl md:text-7xl'
  };

  return (
    <div className={cn('font-bold tracking-tight text-center', sizes[size], className)}>
      <h1 className="inline-block">
        <span className="text-gradient font-mono" style={{ '--glow-color': 'rgba(14, 165, 233, 0.7)' } as React.CSSProperties}>
          NEURAL
        </span>
        <span className="text-glow-sm ml-2" style={{ '--glow-color': 'rgba(155, 135, 245, 0.7)' } as React.CSSProperties}>
          QUEST
        </span>
      </h1>
    </div>
  );
};

export default GameLogo;
