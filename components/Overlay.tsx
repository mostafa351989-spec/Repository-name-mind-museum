import { useStore } from './store';

export default function Overlay() {
  const {
    guideMessage,
    selectedProject,
    setSelectedProject,
    primaryColor,
    setGuideMessage,
    setGuideLanguage,
    guideLanguage,
    setProjects,
    projects,
    arName,
    enName,
    email,
    phone
  } = useStore();

  const allProjects = [
    { id: 1, title: 'مشروع React', type: 'برمجة', info: 'موقع تفاعلي بـ React', pos: [-2, 0, 0] as [number, number, number] },
    { id: 2, title: 'تصميم شعار', type: 'تصميم', info: 'هوية بصرية كاملة', pos: [2, 0, 0] as [number, number, number] },
    { id: 3, title: 'متجر إلكتروني', type: 'برمجة', info: 'Next.js + Stripe', pos: [0, 0, -3] as [number, number, number] },
  ];

  const handleShowAll = () => {
    setProjects(allProjects);
    setGuideMessage(guideLanguage === 'ar' ? 'دي كل مشاريعي. دوس على أي شجرة' : 'These are all my projects. Click any tree');
  };

  const handleFilter = (type: string) => {
    const filtered = allProjects.filter(p => p.type === type);
    setProjects(filtered);
    setGuideMessage(guideLanguage === 'ar' 
      ? `دي مشاريع ${type}. دوس على الشجرة عشان التفاصيل` 
      : `These are ${type} projects. Click a tree for details`);
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 10 }}>
        <button onClick={() => {}} style={{ padding: '12px 20px', borderRadius: 25, border: 'none', background: '#333', color: 'white', cursor: 'pointer' }}>
          ⚙️ الإعدادات
        </button>
      </div>

      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 10 }}>
        <button style={{ padding: 12, borderRadius: '50%', border: 'none', background: '#333', color: 'white', cursor: 'pointer' }}>🔇</button>
      </div>

      {!selectedProject && (
        <div style={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(20,20,20,0.9)', padding: 20, borderRadius: 15, textAlign: 'center', maxWidth: 300 }}>
          <p style={{ color: 'white', marginBottom: 15 }}>{guideMessage || 'أهلاً بيك في متحف العقل! اختار القسم:'}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => handleFilter('برمجة')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: primaryColor, color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
              💻 برمجة
            </button>
            <button onClick={() => handleFilter('تصميم')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: primaryColor, color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
              🎨 تصميم
            </button>
            <button onClick={handleShowAll} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#555', color: 'white', cursor: 'pointer' }}>
              🌲 الكل
            </button>
          </div>
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
