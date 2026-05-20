import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Experience from '../components/Experience';
import Overlay from '../components/Overlay';

export default function Home() {
  return (
    <>
      <Canvas style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }} camera={{ position: [0, 2, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}
