import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { satellites } from './SolarSystem';

interface NodePopupProps {
  selectedIndex: number | null;
  onClose: () => void;
}

export default function NodePopup({ selectedIndex, onClose }: NodePopupProps) {
  if (selectedIndex === null || selectedIndex < 0) return null;

  const satellite = satellites[selectedIndex];
  const Icon = satellite.icon;

  // Generate dummy data for the selected node
  const dummyData = {
    status: 'Active',
    deployedDate: '2025-01-15',
    accuracy: '98.5%',
    processedCases: Math.floor(Math.random() * 50000) + 10000,
    avgProcessingTime: `${(Math.random() * 3 + 0.5).toFixed(1)}s`,
    integration: ['Salesforce', 'SAP', 'Custom APIs'][Math.floor(Math.random() * 3)],
  };

  return (
    <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-2" 
        style={{ borderColor: satellite.color + '40' }}>
        <DialogHeader>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 hover:bg-primary/10"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4 pt-2">
            <div 
              className="flex items-center justify-center rounded-2xl p-4 shadow-2xl border-2 border-white/20"
              style={{
                backgroundColor: satellite.color,
                boxShadow: `0 0 30px ${satellite.color}`,
              }}
            >
              <Icon size={48} color="#000" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-orbitron font-bold mb-1">
                {satellite.name}
              </DialogTitle>
              {satellite.isHero && (
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-secondary/30 text-secondary-foreground border border-secondary/50">
                  Hero Solution
                </span>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-primary/20">
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Description</h4>
            <p className="text-foreground">
              {getNodeDescription(satellite.name)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/30 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {dummyData.status}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Deployed</p>
              <p className="font-semibold text-foreground">{dummyData.deployedDate}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
              <p className="font-semibold text-foreground">{dummyData.accuracy}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Cases Processed</p>
              <p className="font-semibold text-foreground">{dummyData.processedCases.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Avg Processing</p>
              <p className="font-semibold text-foreground">{dummyData.avgProcessingTime}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Integration</p>
              <p className="font-semibold text-foreground">{dummyData.integration}</p>
            </div>
          </div>

          <div className="p-4 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Key Features
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>AI-powered automation with machine learning capabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time data processing and analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Seamless integration with existing systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>24/7 monitoring and intelligent alerting</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getNodeDescription(name: string): string {
  const descriptions: { [key: string]: string } = {
    'Underwriting AI': 'Intelligent risk assessment and policy creation with real-time data analysis and automated decision-making for optimal coverage.',
    'Quote & Buy AI': 'Streamlined quote generation and instant policy purchase with dynamic pricing optimization and seamless customer experience.',
    'Customer Onboarding AI': 'Seamless customer enrollment with automated verification, KYC processing, and personalized onboarding journeys.',
    'Claims Optimization AI': 'Advanced claims processing with fraud detection, workflow automation, and predictive analytics for faster settlements.',
    'Claims Intake AI': 'Automated claims submission with intelligent document processing, instant acknowledgment, and real-time status updates.',
    'Internal Audit AI': 'Comprehensive compliance monitoring with automated reporting, risk identification, and regulatory adherence.',
    'Claims Audit AI': 'Detailed claims review and validation with pattern recognition, anomaly detection, and quality assurance.',
    'Customer Support AI': 'Intelligent customer assistance with natural language processing, sentiment analysis, and 24/7 availability.',
    'Go-Do Voice/WhatsApp AI': 'Omnichannel communication platform with voice recognition, messaging integration, and multilingual support.',
    'High-Value Risk AI': 'Specialized solutions for marine, energy, and complex commercial insurance with advanced risk modeling.',
  };
  return descriptions[name] || 'Advanced AI solution for insurance operations with cutting-edge technology.';
}
