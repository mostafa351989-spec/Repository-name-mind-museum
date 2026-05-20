import { useState, useEffect, useRef } from 'react';
import { useStore } from './store';
import ContactCard from './ContactCard';
import SettingsPanel from './SettingsPanel';

export default function Overlay() {
  const guideMessage = useStore(s => s.guideMessage);
  const setGuideMessage = useStore(s => s.setGuideMessage);
  const selectedProject = useStore(s => s.selectedProject);
  const setSelectedProject = useStore(s => s.setSelectedProject);
  const volume = useStore(s => s.volume);
  const guideLanguage = useStore(s => s.guideLanguage);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/ambient.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    const playOnTouch = () => {
      if (!muted && audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener('touchstart', playOnTouch);
    };
    window.addEventListener('touchstart', playOnTouch);
    return () => window.removeEventListener('touchstart', playOnTouch);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.play().catch(() => {});
      setMuted(false);
    } else {
      audioRef.current.pause();
      setMuted(true);
    }
  };

  const handleResponse = (ans: string) => {
    const msg = guideLanguage === 'ar'
     ? (ans === 'برمجة'? 'جميل! روح للشجر اللي مكتوب عليه "برمجة" عشان تشوف مشاريعك.' : 'اختيار رائع! الشجر اللي عليه "تصميم" هيوريك أعمالك الفنية.')
      : (ans === 'Programming'? 'Great! Go to the trees labeled "Programming" to see your projects.' : 'Awesome! Trees with "Design" will show your artwork.');
    setGuideMessage(msg);
  };

  const isChoiceMsg = guideMessage?.includes('البرمجة ولا التصميم') || guideMessage?.includes('programming or design');

  return (
    <>
      <button onClick={toggleMute} style={{
        position: 'fixed', top: 20, right: 20, zIndex: 200,
        background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none',
        borderRadius: '50%', width: 40, height: 40, fontSize: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)', cursor: 'pointer'
      }}>
        {muted? '🔇' : '🎵'}
      </button>

      {guideMessage && (
        <div style={{
          position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)', color: 'white', padding: '16px 24px',
          borderRadius: 12, maxWidth: '85%', textAlign: 'center', fontFamily: 'sans-serif',
          zIndex: 100, backdropFilter: 'blur(8px)', fontSize: '0.9rem'
        }}>
          <p style={{ marginBottom: isChoiceMsg? 12 : 0 }}>{guideMessage}</p>
          {isChoiceMsg && (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => handleResponse(guideLanguage === 'ar'? 'برمجة' : 'Programming')} style={btnStyle}>
                💻 {guideLanguage === 'ar'? 'برمجة' : 'Prog'}
              </button>
              <button onClick={() => handleResponse(guideLanguage === 'ar'? 'تصميم' : 'Design')} style={btnStyle}>
                🎨 {guideLanguage === 'ar'? 'تصميم' : 'Design'}
              </button>
            </div>
          )}
        </div>
      )}

      {selectedProject && (
        <div style={{
          position: 'fixed', top: 30, right: 10, left: 10, maxWidth: 300, marginLeft: 'auto', marginRight: 'auto',
          background: 'rgba(255,255,255,0.95)', color: '#111', padding: 20, borderRadius: 16,
          zIndex: 101, boxShadow: '0 10px 25px rgba(0,0,0,0.5)', fontFamily: 'sans-serif'
        }}>
          <h3 style={{ margin: 0 }}>{selectedProject.title}</h3>
          <p style={{ margin: '8px 0' }}>{guideLanguage === 'ar'? 'النوع' : 'Type'}: {selectedProject.type}</p>
          <p>{selectedProject.info}</p>
          <button onClick={() => setSelectedProject(null)} style={btnStyle}>إغلاق</button>
        </div>
      )}

      <ContactCard />
      <SettingsPanel />
    </>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px', borderRadius: 8, border: 'none',
  background: '#ffaa00', color: '#000', fontWeight: 'bold', cursor: 'pointer',
  fontSize: '0.9rem'
};
