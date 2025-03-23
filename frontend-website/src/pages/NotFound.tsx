
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeuroButton from '@/components/NeuroButton';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4 text-glow-sm" style={{ '--glow-color': 'rgba(239, 68, 68, 0.7)' } as React.CSSProperties}>
          404
        </h1>
        
        <p className="text-xl text-white/80 mb-8">
          Quantum anomaly detected. This reality doesn't exist.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <NeuroButton 
          onClick={() => navigate('/')}
          variant="primary"
        >
          Return to Base
        </NeuroButton>
      </motion.div>
    </div>
  );
};

export default NotFound;
