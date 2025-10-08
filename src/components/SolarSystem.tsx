import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Shield, 
  ShoppingCart, 
  UserCheck, 
  Zap, 
  Mail, 
  Search, 
  FileCheck, 
  MessageCircle, 
  Phone, 
  Ship 
} from 'lucide-react';

// Central hub data
const centralHub = {
  name: 'AI Insurance Platform',
  description: 'Neural Network Powered Insurance Solutions'
};

// Neural network node data with layer positions
const satellites = [
  { 
    name: 'Underwriting AI', 
    icon: Shield, 
    layer: 1, 
    position: 0,
    color: '#00d4ff',
    isHero: false 
  },
  { 
    name: 'Quote & Buy AI', 
    icon: ShoppingCart, 
    layer: 1, 
    position: 1,
    color: '#00d4ff',
    isHero: false 
  },
  { 
    name: 'Customer Onboarding AI', 
    icon: UserCheck, 
    layer: 1, 
    position: 2,
    color: '#00d4ff',
    isHero: false 
  },
  { 
    name: 'Claims Optimization AI', 
    icon: Zap, 
    layer: 2, 
    position: 0,
    color: '#a855f7',
    isHero: true 
  },
  { 
    name: 'Claims Intake AI', 
    icon: Mail, 
    layer: 2, 
    position: 1,
    color: '#00d4ff',
    isHero: false 
  },
  { 
    name: 'Internal Audit AI', 
    icon: Search, 
    layer: 2, 
    position: 2,
    color: '#00d4ff',
    isHero: false 
  },
  { 
    name: 'Claims Audit AI', 
    icon: FileCheck, 
    layer: 3, 
    position: 0,
    color: '#00d4ff',
    isHero: false 
  },
  { 
    name: 'Customer Support AI', 
    icon: MessageCircle, 
    layer: 3, 
    position: 1,
    color: '#a855f7',
    isHero: true 
  },
  { 
    name: 'Go-Do Voice/WhatsApp AI', 
    icon: Phone, 
    layer: 3, 
    position: 2,
    color: '#a855f7',
    isHero: true 
  },
  { 
    name: 'High-Value Risk AI', 
    icon: Ship, 
    layer: 3, 
    position: 3,
    color: '#a855f7',
    isHero: true 
  },
];

// Calculate node position in 3D space based on layer
function getNodePosition(layer: number, position: number, totalInLayer: number): [number, number, number] {
  const layerSpacing = 5;
  const verticalSpacing = 2.5;
  const depthVariation = 3;
  const x = (layer - 2) * layerSpacing; // Center around 0
  const y = (position - (totalInLayer - 1) / 2) * verticalSpacing;
  // Add depth variation based on position to create 3D effect
  const z = Math.sin(position * Math.PI / totalInLayer) * depthVariation;
  return [x, y, z];
}

// Central Hub Component
function CentralHub() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight ref={lightRef} color="#00d4ff" intensity={2} distance={20} />
      
      {/* Central Hub Label */}
      <Html
        center
        distanceFactor={2}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div className="flex flex-col items-center gap-2" style={{ width: '280px' }}>
          <div
            className="px-6 py-3 rounded-xl backdrop-blur-md border-2"
            style={{
              backgroundColor: 'rgba(0, 212, 255, 0.15)',
              border: '2px solid #00d4ff',
              boxShadow: '0 0 40px #00d4ff, 0 0 80px #00d4ff50',
            }}
          >
            <h1 
              className="font-bold text-center leading-tight"
              style={{
                color: '#00d4ff',
                textShadow: '0 0 30px #00d4ff, 0 0 15px #00d4ff, 0 2px 8px rgba(0,0,0,0.9)',
                fontSize: '20px',
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '1px',
              }}
            >
              {centralHub.name}
            </h1>
            <p
              className="text-center mt-1"
              style={{
                color: '#ffffff',
                textShadow: '0 0 15px #00d4ff, 0 2px 6px rgba(0,0,0,0.9)',
                fontSize: '12px',
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.5px',
              }}
            >
              {centralHub.description}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
}

// Connection Line Component using 3D cylinders
function ConnectionLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  const midpoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.02, 0.02, length, 8]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.4}
      />
    </mesh>
  );
}

// Neural Network Node Component
function NeuralNode({ 
  satellite, 
  index, 
  onClick, 
  isSelected,
  position,
  hideLabel
}: { 
  satellite: typeof satellites[0]; 
  index: number; 
  onClick: () => void;
  isSelected: boolean;
  position: [number, number, number];
  hideLabel: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.lookAt(state.camera.position);
    }
    
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 2 + index) * 0.05;
    }
  });

  const scale = satellite.isHero ? 2.35 : 2.1;
  const glowIntensity = satellite.isHero ? 0.9 : 0.7;

  const Icon = satellite.icon;

  return (
    <group ref={groupRef} position={position}>
      <mesh 
        ref={meshRef} 
        onClick={onClick}
        scale={isSelected ? scale * 0.2 : scale}
      >
        {/* Node sphere */}
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={satellite.color}
          emissive={satellite.color}
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.55}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh scale={isSelected ? scale * 1.4 : scale * 1.2}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial
          color={satellite.color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light */}
      <pointLight color={satellite.color} intensity={1.2} distance={4} />
      
      {/* Icon and Label inside node */}
      {!hideLabel && (
        <Html
          center
          distanceFactor={1.5}
          style={{
            pointerEvents: 'auto',
            userSelect: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <div 
            className="flex flex-col items-center gap-3 cursor-pointer hover:scale-110 transition-transform" 
            style={{ width: '260px' }}
            onClick={onClick}
          >
            <div 
              className="flex items-center justify-center rounded-full p-5 shadow-2xl border-2 border-white/20"
              style={{
                backgroundColor: satellite.color,
                transform: isSelected ? 'scale(1.3)' : 'scale(1)',
                boxShadow: `0 0 40px ${satellite.color}, 0 0 80px ${satellite.color}50`,
              }}
            >
              <Icon size={satellite.isHero ? 102 : 96} color="#000" strokeWidth={3} />
            </div>
            <div
              className="px-5 py-3 rounded-lg backdrop-blur-sm"
              style={{
                //backgroundColor: 'rgba(0, 0, 0, 0.9)',
                //border: `2px solid ${satellite.color}60`,
              }}
            >
              <span 
                className="font-bold text-center leading-tight block"
                style={{
                  color: '#ffffff',
                  textShadow: `0 0 25px ${satellite.color}, 0 0 12px ${satellite.color}, 0 2px 8px rgba(0,0,0,0.9)`,
                  fontSize: satellite.isHero ? '98px' : '96px',
                  fontFamily: 'Orbitron, sans-serif',
                  letterSpacing: '1px',
                }}
              >
                {satellite.name}
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// 3D Scene Component
function Scene({ onSatelliteClick, selectedIndex, hideLabels }: { 
  onSatelliteClick: (index: number) => void;
  selectedIndex: number | null;
  hideLabels: boolean;
}) {
  // Group satellites by layer
  const layerGroups: { [key: number]: typeof satellites } = {};
  satellites.forEach(sat => {
    if (!layerGroups[sat.layer]) layerGroups[sat.layer] = [];
    layerGroups[sat.layer].push(sat);
  });

  // Calculate positions and connections
  const nodePositions: { [key: number]: [number, number, number] } = {};
  satellites.forEach((sat, idx) => {
    const totalInLayer = layerGroups[sat.layer].length;
    nodePositions[idx] = getNodePosition(sat.layer, sat.position, totalInLayer);
  });

  // Generate connections between adjacent layers
  const connections: Array<{ start: [number, number, number]; end: [number, number, number]; color: string }> = [];
  satellites.forEach((sat, idx) => {
    const nextLayer = sat.layer + 1;
    satellites.forEach((nextSat, nextIdx) => {
      if (nextSat.layer === nextLayer) {
        connections.push({
          start: nodePositions[idx],
          end: nodePositions[nextIdx],
          color: sat.color
        });
      }
    });
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 3, 20]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={12}
        maxDistance={35}
        autoRotate={false}
      />

      {/* Starfield */}
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Central hub */}
      <CentralHub />

      {/* Connection lines */}
      {connections.map((conn, idx) => (
        <ConnectionLine
          key={`connection-${idx}`}
          start={conn.start}
          end={conn.end}
          color={conn.color}
        />
      ))}

      {/* Neural nodes */}
      {satellites.map((satellite, index) => (
        <NeuralNode
          key={index}
          satellite={satellite}
          index={index}
          onClick={() => onSatelliteClick(index)}
          isSelected={selectedIndex === index}
          position={nodePositions[index]}
          hideLabel={hideLabels}
        />
      ))}
    </>
  );
}

// Main Neural Network Component
export default function SolarSystem({ 
  selectedSatellite, 
  onSatelliteClick 
}: { 
  selectedSatellite: number | null;
  onSatelliteClick: (index: number) => void;
}) {
  const handleSatelliteClick = (index: number) => {
    onSatelliteClick(index);
  };

  return (
    <div className="relative w-full h-screen">
      <Canvas>
        <Scene 
          onSatelliteClick={handleSatelliteClick} 
          selectedIndex={selectedSatellite}
          hideLabels={selectedSatellite !== null}
        />
      </Canvas>
    </div>
  );
}

export { satellites };
