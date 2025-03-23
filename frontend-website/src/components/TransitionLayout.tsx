
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');

      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300); // Match with CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundParticles />
      <div
        className={`page-transition w-full flex-grow overflow-hidden ${
          transitionStage === 'fadeIn' ? 'animate-scale-up' : 'animate-scale-down'
        }`}
        style={{ transition: 'all 0.3s ease-in-out' }}
      >
        {children}
      </div>
    </div>
  );
};

export default TransitionLayout;
