import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from './store';

interface TreeProps {
  position: [number, number, number];
  project: { id: number; title: string; type: string; info: string };
}

export default function Tree({ position, project }: TreeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const setSelectedProject = useStore(s => s.setSelectedProject);
  const setGuideMessage = useStore(s => s.setGuideMessage);
  const guideLanguage = useStore(s => s.guideLanguage);

  useFrame((_, delta) => { if (meshRef.current) meshRef.current.rotation.y += delta * 0.2; });

  const handleClick = () => {
    setSelectedProject(project);
    const msg = guideLanguage === 'ar'
     ? `ده مشروع "${project.title}" من نوع ${project.type}. اضغط مرة تانية عشان تقفل.`
      : `Project "${project.title}" - type: ${project.type}. Click again to close.`;
    setGuideMessage(msg);
  };

  return (
    <group ref={meshRef} position={position}>
      <mesh position={[0, 0.5, 0]} onClick={handleClick}
        onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <cylinderGeometry args={[0.1, 0.15, 1, 6]} />
        <meshStandardMaterial color={hovered? '#6b8c42' : '#4a5d23'} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.5, 0.8, 8]} />
        <meshStandardMaterial color={hovered? '#8fbc8f' : '#2e4a1c'} />
      </mesh>
      <Text position={[0, 2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">{project.title}</Text>
    </group>
  );
}
