import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, Sparkles, Cloud } from '@react-three/drei';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Mesh, Group, BufferGeometry, Material } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface TreeProps {
  ecoPoints: number;
  growth: number;
}

function AnimatedTree({ ecoPoints, growth }: TreeProps) {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const { scale, position } = useSpring({
    scale: hovered ? 1.1 : 1,
    position: [0, growth * -0.5, 0] as [number, number, number],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const trunkHeight = Math.max(0.5, growth * 2);
  const leavesScale = Math.max(0.3, growth);

  return (
    <animated.group 
      ref={meshRef}
      scale={scale}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Tree Trunk */}
      <mesh position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.15, trunkHeight, 8]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
      
      {/* Tree Leaves - Multiple layers for depth */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <mesh position={[0, trunkHeight + 0.3, 0]} scale={leavesScale}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshLambertMaterial color="#228B22" />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.05}>
        <mesh position={[0.2, trunkHeight + 0.5, 0.1]} scale={leavesScale * 0.7}>
          <sphereGeometry args={[0.6, 12, 12]} />
          <meshLambertMaterial color="#32CD32" />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.08}>
        <mesh position={[-0.1, trunkHeight + 0.4, -0.2]} scale={leavesScale * 0.6}>
          <sphereGeometry args={[0.5, 10, 10]} />
          <meshLambertMaterial color="#90EE90" />
        </mesh>
      </Float>

      {/* Fruits based on eco points */}
      {ecoPoints > 500 && (
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.2}>
          <mesh position={[0.3, trunkHeight + 0.2, 0.2]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshLambertMaterial color="#FFD700" />
          </mesh>
        </Float>
      )}
      
      {ecoPoints > 1000 && (
        <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.15}>
          <mesh position={[-0.2, trunkHeight + 0.3, 0.1]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshLambertMaterial color="#FF6347" />
          </mesh>
        </Float>
      )}

      {/* Sparkles around tree when high eco points */}
      {ecoPoints > 800 && (
        <Sparkles 
          count={20}
          scale={3}
          size={2}
          speed={0.5}
          color="#FFD700"
        />
      )}
    </animated.group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 10,
        Math.random() * 5,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      size: Math.random() * 0.05 + 0.02,
      color: ['#90EE90', '#32CD32', '#FFD700', '#87CEEB'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  return (
    <group ref={particlesRef}>
      {particles.map((particle) => (
        <Float 
          key={particle.id} 
          speed={Math.random() * 2 + 1}
          rotationIntensity={Math.random() * 0.5}
          floatIntensity={Math.random() * 2 + 1}
        >
          <mesh position={particle.position}>
            <sphereGeometry args={[particle.size, 6, 6]} />
            <meshLambertMaterial color={particle.color} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function EcoText({ ecoPoints, growth }: { ecoPoints: number; growth: number }) {
  const textRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, growth * 2 + 1, 0]}
      fontSize={0.3}
      color="#228B22"
      anchorX="center"
      anchorY="middle"
      font="/fonts/Inter-Bold.woff"
    >
      {ecoPoints.toLocaleString()} Eco-Points
    </Text>
  );
}

interface EcoTreeSceneProps {
  ecoPoints: number;
  className?: string;
}

export function EcoTreeScene({ ecoPoints, className = "" }: EcoTreeSceneProps) {
  const [growth, setGrowth] = useState(0);
  
  useEffect(() => {
    const targetGrowth = Math.min(ecoPoints / 2000, 1);
    const interval = setInterval(() => {
      setGrowth(prev => {
        const diff = targetGrowth - prev;
        return prev + diff * 0.05;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [ecoPoints]);

  return (
    <div className={`w-full h-64 ${className}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#87CEEB" />
        
        <Environment preset="forest" />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshLambertMaterial color="#8FBC8F" />
        </mesh>
        
        {/* Clouds */}
        <Cloud position={[3, 3, -2]} speed={0.2} opacity={0.3} />
        <Cloud position={[-3, 4, -3]} speed={0.3} opacity={0.2} />
        
        <AnimatedTree ecoPoints={ecoPoints} growth={growth} />
        <FloatingParticles />
        <EcoText ecoPoints={ecoPoints} growth={growth} />
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}