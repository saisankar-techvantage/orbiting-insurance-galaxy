import { useState } from 'react';
import SolarSystem from '@/components/SolarSystem';
import UIOverlay from '@/components/UIOverlay';
import NodePopup from '@/components/NodePopup';
import cosmicBg from '@/assets/cosmic-background.jpg';

const Index = () => {
  const [selectedSatellite, setSelectedSatellite] = useState<number | null>(null);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-80 pointer-events-none" />
      
      {/* Particles effect overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-full h-full animate-float">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Solar System */}
      <SolarSystem 
        selectedSatellite={selectedSatellite}
        onSatelliteClick={setSelectedSatellite}
      />

      {/* 2D UI Overlay */}
      <UIOverlay 
        selectedSatellite={selectedSatellite}
        onClose={() => setSelectedSatellite(null)}
      />

      {/* Node Popup Dialog */}
      <NodePopup 
        selectedIndex={selectedSatellite}
        onClose={() => setSelectedSatellite(null)}
      />
    </div>
  );
};

export default Index;
