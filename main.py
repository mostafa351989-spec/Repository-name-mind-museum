mkdir mind-museum && cd mind-museum && cat > package.json << 'EOF'
{
  "name": "mind-museum",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@react-three/drei": "^9.88.0",
    "@react-three/fiber": "^8.15.11",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^20.10.4",
    "@types/react": "^18.2.42",
    "@types/three": "^0.160.0",
    "typescript": "^5.3.3"
  }
}
EOF
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
module.exports = nextConfig;
EOF
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF
mkdir -p styles pages components public
cat > styles/globals.css << 'EOF'
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #__next { height: 100%; width: 100%; overflow: hidden; background: #000; }
EOF
cat > pages/index.tsx << 'EOF'
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
EOF
cat > components/Experience.tsx << 'EOF'
import { OrbitControls, Stars } from '@react-three/drei';
import Forest from './Forest';
import Guide from './Guide';

export default function Experience() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Stars radius={50} depth={50} count={1000} factor={4} />
      <fog attach="fog" args={['#0a0a1a', 5, 25]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a1a0a" />
      </mesh>
      <Forest />
      <Guide />
      <OrbitControls enablePan enableZoom maxPolarAngle={Math.PI / 2.2} minDistance={3} maxDistance={15} />
    </>
  );
}
EOF
cat > components/Forest.tsx << 'EOF'
import Tree from './Tree';

const projects = [
  { id: 1, title: 'متجر إلكتروني', type: 'برمجة', pos: [-3, 0, -2], info: 'مشروع متجر كامل بـ Next.js' },
  { id: 2, title: 'هوية بصرية', type: 'تصميم', pos: [2, 0, -3], info: 'شعار وتصميم كتيب لشركة ناشئة' },
  { id: 3, title: 'تطبيق جوال', type: 'برمجة', pos: [0, 0, -4], info: 'تطبيق لإدارة المهام بـ React Native' },
  { id: 4, title: 'موقع تعريفي', type: 'برمجة', pos: [-2, 0, 1], info: 'موقع شخصي بتقنيات حديثة' },
  { id: 5, title: 'بوستر فيلم', type: 'تصميم', pos: [3, 0, 0], info: 'تصميم جرافيكي لفيلم وثائقي' },
];

export default function Forest() {
  return <>{projects.map(p => <Tree key={p.id} position={p.pos as [number,number,number]} project={p} />)}</>;
}
EOF
cat > components/Tree.tsx << 'EOF'
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

  useFrame((_, delta) => { if (meshRef.current) meshRef.current.rotation.y += delta * 0.2; });

  return (
    <group ref={meshRef} position={position}>
      <mesh position={[0, 0.5, 0]} onClick={() => {
        setSelectedProject(project);
        setGuideMessage(`ده مشروع "${project.title}" من نوع ${project.type}. اضغط مرة تانية عشان تقفل.`);
      }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <cylinderGeometry args={[0.1, 0.15, 1, 6]} />
        <meshStandardMaterial color={hovered ? '#6b8c42' : '#4a5d23'} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.5, 0.8, 8]} />
        <meshStandardMaterial color={hovered ? '#8fbc8f' : '#2e4a1c'} />
      </mesh>
      <Text position={[0, 2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">{project.title}</Text>
    </group>
  );
}
EOF
cat > components/Guide.tsx << 'EOF'
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from './store';

export default function Guide() {
  const orbRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const setGuideMessage = useStore(s => s.setGuideMessage);

  useEffect(() => {
    const t = setTimeout(() => setGuideMessage('أهلاً بيك في متحف العقل! أنا مرشدك الضوئي. تحب تشوف البرمجة ولا التصميم؟'), 1000);
    return () => clearTimeout(t);
  }, [setGuideMessage]);

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
EOF
cat > components/Overlay.tsx << 'EOF'
import { useStore } from './store';
import ContactCard from './ContactCard';

export default function Overlay() {
  const guideMessage = useStore(s => s.guideMessage);
  const setGuideMessage = useStore(s => s.setGuideMessage);
  const selectedProject = useStore(s => s.selectedProject);
  const setSelectedProject = useStore(s => s.setSelectedProject);

  const handleResponse = (ans: string) => {
    if (ans === 'برمجة') setGuideMessage('جميل! روح للشجر اللي مكتوب عليه "برمجة" عشان تشوف مشاريعك.');
    else setGuideMessage('اختيار رائع! الشجر اللي عليه "تصميم" هيوريك أعمالك الفنية.');
  };

  return (
    <>
      {guideMessage && (
        <div style={{ position:'fixed',bottom:30,left:'50%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.8)',color:'white',padding:'16px 24px',borderRadius:12,maxWidth:'80%',textAlign:'center',fontFamily:'sans-serif',zIndex:100,backdropFilter:'blur(8px)' }}>
          <p style={{ marginBottom: guideMessage.includes('البرمجة ولا التصميم') ? 12 : 0 }}>{guideMessage}</p>
          {guideMessage.includes('البرمجة ولا التصميم') && (
            <div style={{ display:'flex',gap:12,justifyContent:'center' }}>
              <button onClick={() => handleResponse('برمجة')} style={{ padding:'8px 18px',borderRadius:8,border:'none',background:'#ffaa00',color:'#000',fontWeight:'bold',cursor:'pointer' }}>💻 برمجة</button>
              <button onClick={() => handleResponse('تصميم')} style={{ padding:'8px 18px',borderRadius:8,border:'none',background:'#ffaa00',color:'#000',fontWeight:'bold',cursor:'pointer' }}>🎨 تصميم</button>
            </div>
          )}
        </div>
      )}
      {selectedProject && (
        <div style={{ position:'fixed',top:30,right:30,background:'rgba(255,255,255,0.95)',color:'#111',padding:20,borderRadius:16,minWidth:220,zIndex:101,boxShadow:'0 10px 25px rgba(0,0,0,0.5)',fontFamily:'sans-serif' }}>
          <h3 style={{margin:0}}>{selectedProject.title}</h3>
          <p style={{margin:'8px 0'}}>النوع: {selectedProject.type}</p>
          <p>{selectedProject.info}</p>
          <button onClick={() => setSelectedProject(null)} style={{ padding:'8px 18px',borderRadius:8,border:'none',background:'#ffaa00',color:'#000',fontWeight:'bold',cursor:'pointer',marginTop:8 }}>إغلاق</button>
        </div>
      )}
      <ContactCard />
    </>
  );
}
EOF
cat > components/ContactCard.tsx << 'EOF'
import { useState } from 'react';

export default function ContactCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ position:'fixed',top:20,left:20,zIndex:200,padding:'12px 20px',borderRadius:30,border:'none',background:'#ffaa00',color:'#000',fontWeight:'bold',cursor:'pointer' }}>بياناتي</button>
      {open && (
        <div style={{ position:'fixed',top:80,left:20,zIndex:200,background:'rgba(0,0,0,0.85)',color:'white',padding:20,borderRadius:16,backdropFilter:'blur(10px)',fontFamily:'sans-serif',minWidth:220 }}>
          <h3 style={{marginBottom:10}}>مصطفى محمود</h3>
          <h4 style={{marginBottom:10,color:'#ccc'}}>Mostafa Mahmoud</h4>
          <p>📧 mostafa351989@gmail.com</p>
          <p>📱 01044907363</p>
          <button onClick={() => setOpen(false)} style={{ marginTop:10,padding:'6px 14px',borderRadius:6,border:'none',background:'#ffaa00',color:'#000' }}>قفل</button>
        </div>
      )}
    </>
  );
}
EOF
cat > components/store.ts << 'EOF'
import { create } from 'zustand';

interface Project { id: number; title: string; type: string; info: string; }
interface Store {
  guideMessage: string | null;
  setGuideMessage: (msg: string | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
}

export const useStore = create<Store>(set => ({
  guideMessage: null,
  setGuideMessage: msg => set({ guideMessage: msg }),
  selectedProject: null,
  setSelectedProject: p => set({ selectedProject: p }),
}));
EOF
echo "✅ الملفات جاهزة. جاري تثبيت الحزم..."
npm install
git init
git add .
git commit -m "النواة الأولى لمتحف العقل - Mostafa Mahmoud"
echo "⚠️  الآن عيّن المستودع البعيد. انسخ الأمر التالي بعد استبدال YOUR_REPO_URL برابط مستودعك:"
echo "git remote add origin YOUR_REPO_URL && git branch -M main && git push -u origin main"
