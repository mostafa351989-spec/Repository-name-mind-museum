import { create } from 'zustand';

interface Project {
  id: number;
  title: string;
  type: string;
  info: string;
  pos: [number, number, number];
}

interface State {
  guideMessage: string | null;
  setGuideMessage: (msg: string | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  primaryColor: string;
  setPrimaryColor: (c: string) => void;
  backgroundColor: string;
  setBackgroundColor: (c: string) => void;
  arName: string;
  setArName: (n: string) => void;
  enName: string;
  setEnName: (n: string) => void;
  email: string;
  setEmail: (e: string) => void;
  phone: string;
  setPhone: (p: string) => void;
  projects: Project[];
  setProjects: (p: Project[]) => void;
  autoRotateSpeed: number;
  setAutoRotateSpeed: (s: number) => void;
  volume: number;
  setVolume: (v: number) => void;
  showParticles: boolean;
  setShowParticles: (b: boolean) => void;
  guideLanguage: 'ar' | 'en';
  setGuideLanguage: (l: 'ar' | 'en') => void;
  particleCount: number;
  setParticleCount: (n: number) => void;
}

export const useStore = create<State>((set) => ({
  guideMessage: null,
  setGuideMessage: (msg) => set({ guideMessage: msg }),
  selectedProject: null,
  setSelectedProject: (p) => set({ selectedProject: p }),
  primaryColor: '#ffaa00',
  setPrimaryColor: (c) => set({ primaryColor: c }),
  backgroundColor: '#111111',
  setBackgroundColor: (c) => set({ backgroundColor: c }),
  arName: 'مصطفى عبد الخالق',
  setArName: (n) => set({ arName: n }),
  enName: 'Mostafa Abdelkhalek',
  setEnName: (n) => set({ enName: n }),
  email: 'mostafa@example.com',
  setEmail: (e) => set({ email: e }),
  phone: '+20 100 000 0000',
  setPhone: (p) => set({ phone: p }),
  projects: [
    { id: 1, title: 'مشروع React', type: 'برمجة', info: 'موقع تفاعلي بـ React', pos: [-2, 0, 0] },
    { id: 2, title: 'تصميم شعار', type: 'تصميم', info: 'هوية بصرية كاملة', pos: [2, 0, 0] },
    { id: 3, title: 'متجر إلكتروني', type: 'برمجة', info: 'Next.js + Stripe', pos: [0, 0, -3] },
  ],
  setProjects: (p) => set({ projects: p }),
  autoRotateSpeed: 0.5,
  setAutoRotateSpeed: (s) => set({ autoRotateSpeed: s }),
  volume: 0.3,
  setVolume: (v) => set({ volume: v }),
  showParticles: true,
  setShowParticles: (b) => set({ showParticles: b }),
  guideLanguage: 'ar',
  setGuideLanguage: (l) => set({ guideLanguage: l }),
  particleCount: 50,
  setParticleCount: (n) => set({ particleCount: n }),
}));
