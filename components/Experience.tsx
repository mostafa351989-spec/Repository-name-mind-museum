import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Forest from './Forest';
import Guide from './Guide';
import { useStore } from './store';

function FloatingParticles() {
  const count = useStore(s => s.particleCount);
  const show = useStore(s => s.showParticles);
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i+1] = Math.random() * 4;
    positions[i+2] = (Math.random() - 0.5) * 8;
  }
  useEffect(() => {
    if (!ref.current ||!show) return;
    let frame: number;
    const animate = () => {
      ref.current!.rotation.y += 0.0003;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [show]);
  if (!show) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#88ffaa" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function Experience() {
  const primaryColor = useStore(s => s.primaryColor);
  const bgColor = useStore(s => s.backgroundColor);
  const autoRotateSpeed = useStore(s => s.autoRotateSpeed);
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 15, 5]} intensity={0.5} />
      <pointLight position={[0, 3, 0]} intensity={0.4} color={primaryColor} distance={10} />
      <Stars radius={40} depth={40} count={600} factor={3} />
      <fog attach="fog" args={[bgColor, 5, 22]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={bgColor} />
      </mesh>
      <FloatingParticles />
      <Forest />
      <Guide />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2.5}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={autoRotateSpeed}
        target={[0, 1, -1]}
      />
    </>
  );
}
