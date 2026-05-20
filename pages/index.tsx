import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Experience from '../components/Experience';
import Overlay from '../components/Overlay';

export default function Home() {
  return (
    <>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}
