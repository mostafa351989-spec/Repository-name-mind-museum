import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from './store';

export default function Guide() {
  const orbRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const setGuideMessage = useStore(s => s.setGuideMessage);
  const guideLanguage = useStore(s => s.guideLanguage);

  useEffect(() => {
    const t = setTimeout(() => {
      const msg = guideLanguage === 'ar'
       ? 'أهلاً بيك في متحف العقل! أنا مرشدك الضوئي. تحب تشوف البرمجة ولا التصميم؟'
        : 'Welcome to the Mind Museum! I\'m your light guide. Wanna see programming or design?';
      setGuideMessage(msg);
    }, 1000);
    return () => clearTimeout(t);
  }, [setGuideMessage, guideLanguage]);

  useFrame(() => {
    if (orbRef.current) {
      orbRef.current.position.lerp(camera.position.clone().add(new THREE.Vector3(-1.5, 1.2, -2)), 0.1);
      orbRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.1);
    }
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#ffdd44" emissive="#ffaa00" emissiveIntensity={1.5} />
    </mesh>
  );
}
