import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  PerspectiveCamera,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
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
  Ship,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Satellite data
const satellites = [
  {
    name: "Underwriting AI",
    icon: Shield,
    orbit: 4,
    speed: 0.15,
    color: "#00d4ff",
    isHero: false,
  },
  {
    name: "Quote & Buy AI",
    icon: ShoppingCart,
    orbit: 4.5,
    speed: 0.14,
    color: "#00d4ff",
    isHero: false,
  },
  {
    name: "Customer Onboarding AI",
    icon: UserCheck,
    orbit: 5,
    speed: 0.13,
    color: "#00d4ff",
    isHero: false,
  },
  {
    name: "Claims Optimization AI",
    icon: Zap,
    orbit: 5.5,
    speed: 0.12,
    color: "#a855f7",
    isHero: true,
  },
  {
    name: "Claims Intake AI",
    icon: Mail,
    orbit: 6,
    speed: 0.11,
    color: "#00d4ff",
    isHero: false,
  },
  {
    name: "Internal Audit AI",
    icon: Search,
    orbit: 6.5,
    speed: 0.1,
    color: "#00d4ff",
    isHero: false,
  },
  {
    name: "Claims Audit AI",
    icon: FileCheck,
    orbit: 7,
    speed: 0.09,
    color: "#00d4ff",
    isHero: false,
  },
  {
    name: "Customer Support AI",
    icon: MessageCircle,
    orbit: 7.5,
    speed: 0.08,
    color: "#a855f7",
    isHero: true,
  },
  {
    name: "Go-Do Voice/WhatsApp AI",
    icon: Phone,
    orbit: 8,
    speed: 0.07,
    color: "#a855f7",
    isHero: true,
  },
  {
    name: "High-Value Risk AI",
    icon: Ship,
    orbit: 8.5,
    speed: 0.06,
    color: "#a855f7",
    isHero: true,
  },
];

// Central Orb Component
function CentralOrb({ onClick }: { onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <group onClick={onClick}>
      {/* Main orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <ringGeometry args={[2.2, 2.5, 64]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light for illumination */}
      <pointLight ref={lightRef} color="#00d4ff" intensity={2} distance={20} />
    </group>
  );
}

// Orbit Ring Component
function OrbitRing({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Satellite Node Component
function SatelliteNode({
  satellite,
  index,
  onClick,
  isSelected,
}: {
  satellite: (typeof satellites)[0];
  index: number;
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Orbital motion
      const angle =
        time * satellite.speed + (index * (Math.PI * 2)) / satellites.length;
      const x = Math.cos(angle) * satellite.orbit;
      const z = Math.sin(angle) * satellite.orbit;
      groupRef.current.position.set(x, 0, z);

      // Keep node facing camera (billboard effect)
      groupRef.current.lookAt(state.camera.position);
    }

    // Gentle floating animation
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 2 + index) * 0.1;
    }
  });

  const scale = satellite.isHero ? 2.3 : 2;
  const glowIntensity = satellite.isHero ? 0.6 : 0.4;

  const Icon = satellite.icon;

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        scale={isSelected ? scale * 1.2 : scale}
      >
        {/* Node sphere */}
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={satellite.color}
          emissive={satellite.color}
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={isSelected ? scale * 1.4 : scale * 1.2}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial
          color={satellite.color}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light */}
      <pointLight color={satellite.color} intensity={0.5} distance={3} />

      {/* Icon and Label inside node */}
      <Html
        center
        distanceFactor={1.2}
        style={{
          pointerEvents: "auto",
          userSelect: "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="flex flex-col items-center gap-3 cursor-pointer hover:scale-110 transition-transform"
          style={{ width: "180px" }}
          onClick={onClick}
        >
          <div
            className="flex items-center justify-center rounded-full p-6 shadow-2xl border-2 border-white/20"
            style={{
              backgroundColor: satellite.color,
              transform: isSelected ? "scale(1.3)" : "scale(1)",
              boxShadow: `0 0 30px ${satellite.color}, 0 0 60px ${satellite.color}50`,
            }}
          >
            <Icon
              size={satellite.isHero ? 206 : 202}
              color="#ffffffff"
              strokeWidth={3}
            />
          </div>
          <div
            className=" py-2 rounded-lg backdrop-blur-sm"
            style={{
              //backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: `1px solid ${satellite.color}40`,
            }}
          >
            <span
              className="font-bold text-center leading-tight block"
              style={{
                color: "#ffffff",
                textShadow: `0 0 20px ${satellite.color}, 0 0 10px ${satellite.color}, 0 2px 6px rgba(0,0,0,0.9)`,
                fontSize: satellite.isHero ? "95px" : "93px",
                fontFamily: "Orbitron, sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              {satellite.name}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}

// 3D Scene Component
function Scene({
  onSatelliteClick,
  selectedIndex,
}: {
  onSatelliteClick: (index: number) => void;
  selectedIndex: number | null;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 8, 15]} fov={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={10}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />

      {/* Starfield */}
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Central orb */}
      <CentralOrb onClick={() => onSatelliteClick(-1)} />

      {/* Orbit rings */}
      {satellites.map((satellite, index) => (
        <OrbitRing
          key={`ring-${index}`}
          radius={satellite.orbit}
          color={satellite.color}
        />
      ))}

      {/* Satellites */}
      {satellites.map((satellite, index) => (
        <SatelliteNode
          key={index}
          satellite={satellite}
          index={index}
          onClick={() => onSatelliteClick(index)}
          isSelected={selectedIndex === index}
        />
      ))}
    </>
  );
}

// Main Solar System Component
export default function SolarSystem({
  selectedSatellite,
  onSatelliteClick,
}: {
  selectedSatellite: number | null;
  onSatelliteClick: (index: number) => void;
}) {
  const navigate = useNavigate();
  // const handleSatelliteClick = (index: number) => {
  //   onSatelliteClick(index === -1 ? null : index);
  // };

  const handleSatelliteClick = (index: number) => {
    const selected = satellites[index];
    if (selected?.name === "Underwriting AI") {
      // Fade out effect before routing
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "black";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.6s ease";
      overlay.style.zIndex = "9999";
      document.body.appendChild(overlay);

      // Trigger fade
      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
      });

      // Wait for fade then navigate
      setTimeout(() => {
        navigate("/underwriting_ai");
        document.body.removeChild(overlay);
      }, 600);
    } else {
      onSatelliteClick(index === -1 ? null : index);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Canvas>
        <Scene
          onSatelliteClick={handleSatelliteClick}
          selectedIndex={selectedSatellite}
        />
      </Canvas>
    </div>
  );
}

export { satellites };
