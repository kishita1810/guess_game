
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: string;
  size: number;
  color: string;
  delay: string;
}

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      'rgb(14, 165, 233)', // Blue
      'rgb(155, 135, 245)', // Purple
      'rgb(34, 211, 238)', // Cyan
      'rgb(249, 168, 212)', // Pink
      'rgb(252, 211, 77)' // Yellow
    ];
    
    const pieces: ConfettiPiece[] = [];
    
    // Create 80 random confetti pieces
    for (let i = 0; i < 80; i++) {
      pieces.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 0.8 + 0.4, // 0.4 to 1.2rem
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 0.6}s`
      });
    }
    
    setConfetti(pieces);
    
    // Clean up after 5 seconds (animations are 3s)
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute top-0 w-3 h-2 animate-confetti-${(piece.id % 5) + 1}`}
          style={{
            left: piece.left,
            width: `${piece.size}rem`,
            height: `${piece.size * 0.6}rem`,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: `${2 + Math.random() * 2}s`, // 2-4s
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
