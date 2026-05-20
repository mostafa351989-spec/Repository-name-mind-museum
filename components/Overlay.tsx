import { useStore } from './store';
import { useState } from 'react';

export default function Overlay() {
  const [showSettings, setShowSettings] = useState(false);
  const [showProjectsList, setShowProjectsList] = useState<null | string>(null);
  const [soundOn, setSoundOn] = useState(false);
  
  const {
    guideMessage,
    selectedProject,
    setSelectedProject,
    primaryColor,
    setPrimaryColor,
    backgroundColor,
    setBackgroundColor,
    setGuideMessage,
    setGuideLanguage,
    guideLanguage,
    projects,
    arName,
    setArName,
    enName,
    setEnName,
    email,
    setEmail,
    phone,
    setPhone,
    autoRotateSpeed,
    setAutoRotateSpeed,
    volume,
    setVolume,
    showParticles,
    setShowParticles,
    particleCount,
    setParticleCount
  } = useStore();

  const handleSectionClick = (type: string) => {
    setShowProjectsList(type);
    setGuideMessage(guideLanguage === 'ar' 
      ? `دي قائمة مشاريع ${type}` 
      : `Here are ${type} projects`);
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 10 }}>
        <button onClick={() => setShowSettings(!showSettings)} style={{ padding: '12px 20px', borderRadius: 25, border: 'none', background: '#333', color: 'white', cursor: 'pointer' }}>
          ⚙️ الإعدادات
        </button>
      </div>

      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 10 }}>
        <button onClick={() => setSoundOn(!soundOn)} style={{ padding: 12, borderRadius: '50%', border: 'none', background: '#333', color: 'white', cursor: 'pointer' }}>
          {soundOn ? '🔊' : '🔇'}
        </button>
      </div>

      {showSettings && (
        <div style={{ position: 'fixed', top: 70, left: 20, zIndex: 20, background: 'rgba(20,20,20,0.95)', padding: 20, borderRadius: 15, width: 300, maxHeight: '80vh', overflowY: 'auto' }}>
          <h3 style={{ color: primaryColor, marginTop: 0 }}>الإعدادات</h3>
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>اللون الأساسي</label>
          <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} style={{ width: '100%' }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>لون الخلفية</label>
          <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} style={{ width: '100%' }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>الاسم بالعربي</label>
          <input type="text" value={arName} onChange={e => setArName(e.target.value)} style={{ width: '100%', padding: 5, borderRadius: 5 }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>الاسم بالإنجليزي</label>
          <input type="text" value={enName} onChange={e => setEnName(e.target.value)} style={{ width: '100%', padding: 5, borderRadius: 5 }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>الإيميل</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 5, borderRadius: 5 }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>الموبايل</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: 5, borderRadius: 5 }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>سرعة الدوران: {autoRotateSpeed}</label>
          <input type="range" min="0" max="2" step="0.1" value={autoRotateSpeed} onChange={e => setAutoRotateSpeed(Number(e.target.value))} style={{ width: '100%' }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>الصوت: {volume}</label>
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={e => setVolume(Number(e.target.value))} style={{ width: '100%' }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>
            <input type="checkbox" checked={showParticles} onChange={e => setShowParticles(e.target.checked)} /> إظهار الجزيئات
          </label>
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>عدد الجزيئات: {particleCount}</label>
          <input type="range" min="10" max="200" step="10" value={particleCount} onChange={e => setParticleCount(Number(e.target.value))} style={{ width: '100%' }} />
          
          <label style={{ color: 'white', display: 'block', marginTop: 10 }}>لغة المرشد</label>
          <select value={guideLanguage} onChange={e => setGuideLanguage(e.target.value as 'ar' | 'en')} style={{ width: '100%', padding: 5, borderRadius: 5 }}>
            <option value="ar">عربي</option>
            <option value="en">English</option>
          </select>
          
          <button onClick={() => setShowSettings(false)} style={{ marginTop: 20, padding: '10px', width: '100%', borderRadius: 10, border: 'none', background: primaryColor, color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
            إغلاق
          </button>
        </div>
      )}

      {!selectedProject && !showProjectsList && (
        <div style={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(20,20,20,0.9)', padding: 20, borderRadius: 15, textAlign: 'center', maxWidth: 300 }}>
          <p style={{ color: 'white', marginBottom: 15 }}>{guideMessage || 'أهلاً بيك في متحف العقل! اختار القسم:'}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => handleSectionClick('برمجة')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: primaryColor, color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
              💻 برمجة
            </button>
            <button onClick={() => handleSectionClick('تصميم')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: primaryColor, color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
              🎨 تصميم
            </button>
          </div>
        </div>
      )}

      {showProjectsList && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20, background: 'rgba(20,20,20,0.95)', padding: 20, borderRadius: 15, border: `2px solid ${primaryColor}`, maxWidth: 400, width: '90%' }}>
          <h2 style={{ color: primaryColor, marginTop: 0 }}>مشاريع {showProjectsList}</h2>
          {projects.filter(p => p.type === showProjectsList).map(p => (
            <div key={p.id} onClick={() => { setSelectedProject(p); setShowProjectsList(null); }} style={{ padding: 15, margin: '10px 0', background: '#333', borderRadius: 10, cursor: 'pointer' }}>
              <h3 style={{ color: 'white', margin: 0 }}>{p.title}</h3>
              <p style={{ color: '#aaa', margin: '5px 0 0 0', fontSize: 14 }}>{p.info}</p>
            </div>
          ))}
          <button onClick={() => setShowProjectsList(null)} style={{ marginTop: 15, padding: '10px 20px', borderRadius: 10, border: 'none', background: '#555', color: 'white', cursor: 'pointer', width: '100%' }}>
            رجوع
          </button>
        </div>
      )}

      {selectedProject && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20, background: 'rgba(20,20,20,0.95)', padding: 30, borderRadius: 15, border: `2px solid ${primaryColor}`, maxWidth: 400 }}>
          <h2 style={{ color: primaryColor, marginTop: 0 }}>{selectedProject.title}</h2>
          <p style={{ color: '#aaa' }}>النوع: {selectedProject.type}</p>
          <p style={{ color: 'white' }}>{selectedProject.info}</p>
          <button onClick={() => setSelectedProject(null)} style={{ marginTop: 20, padding: '10px 20px', borderRadius: 10, border: 'none', background: primaryColor, color: 'black', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
            إغلاق
          </button>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 40, left: 20, zIndex: 10 }}>
        <button onClick={() => setSelectedProject({ id: 0, title: arName, type: 'بيانات', info: `الاسم: ${arName}\nEn: ${enName}\nEmail: ${email}\nPhone: ${phone}`, pos: [0,0,0] })} style={{ padding: '12px 20px', borderRadius: 25, border: 'none', background: primaryColor, color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
          📋 بياناتي
        </button>
      </div>
    </>
  );
}
