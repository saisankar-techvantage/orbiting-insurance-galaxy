import { useState } from 'react';
import { QrCode, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { satellites } from './SolarSystem';

interface UIOverlayProps {
  selectedSatellite: number | null;
  onClose: () => void;
}

export default function UIOverlay({ selectedSatellite, onClose }: UIOverlayProps) {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {/* Header with title */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 text-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-glow mb-4">
          Insurance OS
        </h1>
        <p className="text-xl md:text-2xl text-primary/80 font-inter">
          The Invisible Intelligence Layer for Insurance
        </p>
        <p className="text-sm md:text-base text-muted-foreground mt-2 font-inter">
          Powered by Partner + Zentis + Go-Do
        </p>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
        <div className="bg-card/80 backdrop-blur-md border border-primary/30 rounded-lg p-4 text-sm">
          <p className="text-foreground/80 mb-1">🖱️ <span className="font-semibold">Drag</span> to rotate</p>
          <p className="text-foreground/80 mb-1">🔍 <span className="font-semibold">Scroll</span> to zoom</p>
          <p className="text-foreground/80">👆 <span className="font-semibold">Click</span> satellites to explore</p>
        </div>
      </div>

      {/* QR Code button */}
      <div className="absolute bottom-8 right-8 z-10 pointer-events-auto">
        <Button
          onClick={() => setShowQR(!showQR)}
          className="bg-primary/20 hover:bg-primary/30 border border-primary/50 backdrop-blur-md text-foreground"
        >
          <QrCode className="mr-2 h-5 w-5" />
          Book a Demo
        </Button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-auto">
          <Card className="relative p-8 bg-card/95 border-primary/30 max-w-md">
            <Button
              onClick={() => setShowQR(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
            >
              <X className="h-5 w-5" />
            </Button>
            
            <h3 className="text-2xl font-orbitron font-bold mb-4 text-center">
              Book a Live Demo
            </h3>
            
            <div className="bg-white p-4 rounded-lg mb-4">
              {/* Placeholder for QR code */}
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <QrCode className="h-32 w-32 text-muted-foreground" />
              </div>
            </div>
            
            <p className="text-center text-muted-foreground text-sm">
              Scan to schedule your personalized demo
            </p>
          </Card>
        </div>
      )}

      {/* Satellite Detail Panel */}
      {selectedSatellite !== null && selectedSatellite >= 0 && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 pointer-events-auto">
          <Card className="bg-card/95 backdrop-blur-md border-primary/30 p-6 max-w-sm animate-in slide-in-from-right">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${satellites[selectedSatellite].isHero ? 'bg-secondary/20 border border-secondary/50' : 'bg-primary/20 border border-primary/50'}`}>
                {(() => {
                  const IconComponent = satellites[selectedSatellite].icon;
                  return <IconComponent className="h-8 w-8" />;
                })()}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-orbitron font-bold mb-2">
                  {satellites[selectedSatellite].name}
                </h3>
                {satellites[selectedSatellite].isHero && (
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-secondary/30 text-secondary-foreground border border-secondary/50">
                    Hero Solution
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              {getProductDescription(satellites[selectedSatellite].name)}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>AI-Powered Intelligence</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Seamless Integration</span>
              </div>
            </div>

            <Button 
              className="w-full mt-6 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-foreground"
              onClick={() => setShowQR(true)}
            >
              Learn More
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}

// Helper function for product descriptions
function getProductDescription(name: string): string {
  const descriptions: { [key: string]: string } = {
    'Underwriting AI': 'Intelligent risk assessment and policy creation with real-time data analysis and automated decision-making.',
    'Quote & Buy AI': 'Streamlined quote generation and instant policy purchase with dynamic pricing optimization.',
    'Customer Onboarding AI': 'Seamless customer enrollment with automated verification and personalized experience.',
    'Claims Optimization AI': 'Advanced claims processing with fraud detection, workflow automation, and predictive analytics.',
    'Claims Intake AI': 'Automated claims submission with intelligent document processing and instant acknowledgment.',
    'Internal Audit AI': 'Comprehensive compliance monitoring with automated reporting and risk identification.',
    'Claims Audit AI': 'Detailed claims review and validation with pattern recognition and anomaly detection.',
    'Customer Support AI': 'Intelligent customer assistance with natural language processing and 24/7 availability.',
    'Go-Do Voice/WhatsApp AI': 'Omnichannel communication platform with voice and messaging integration.',
    'High-Value Risk AI': 'Specialized solutions for marine, energy, and complex commercial insurance needs.',
  };
  return descriptions[name] || 'Advanced AI solution for insurance operations.';
}
