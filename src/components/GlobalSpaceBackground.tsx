import React from 'react';
import ThreeGalaxy from './canvas/ThreeGalaxy';

const GlobalSpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <ThreeGalaxy starCount={20000} />
    </div>
  );
};

export default GlobalSpaceBackground;
