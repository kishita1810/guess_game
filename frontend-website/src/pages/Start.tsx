
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameLogo from '@/components/GameLogo';
import NeuroButton from '@/components/NeuroButton';
import { motion } from 'framer-motion';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <GameLogo className="mb-12 animate-pulse-glow" />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <NeuroButton 
            size="lg" 
            onClick={() => navigate('/mode-select')}
            className="min-w-40 animate-pulse-glow"
          >
            Start Game
          </NeuroButton>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-16 text-sm text-white/70 max-w-xs text-center"
        >
          A futuristic guessing game challenging your abilities across words and codes
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Start;
