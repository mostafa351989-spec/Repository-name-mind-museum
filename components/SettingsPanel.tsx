import { useState } from 'react';
import { useStore } from './store';

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const primaryColor = useStore(s => s.primaryColor);
  const setPrimaryColor = useStore(s => s.setPrimaryColor);
  const backgroundColor = useStore(s => s.backgroundColor);
  const setBackgroundColor = useStore(s => s.setBackgroundColor);
  const arName = useStore(s => s.arName);
  const setArName = useStore(s => s.setArName);
  const enName = useStore(s => s.enName);
  const setEnName = useStore(s => s.setEnName);
  const email = useStore(s => s.email);
  const setEmail = useStore(s => s.setEmail);
  const phone = useStore(s => s.phone);
  const setPhone = useStore(s => s.setPhone);
  const projects = useStore(s => s.projects);
  const setProjects = useStore(s => s.setProjects);
  const autoRotateSpeed = useStore(s => s.autoRotateSpeed);
  const setAutoRotateSpeed = useStore(s => s.setAutoRotateSpeed);
  const volume = useStore(s => s.volume);
  const setVolume = useStore(s => s.setVolume);
  const showParticles = useStore(s => s.showParticles);
  const setShowParticles = useStore(s => s.setShowParticles);
  const guideLanguage = useStore(s => s.guideLanguage);
  const setGuideLanguage = useStore(s => s.setGuideLanguage);
  const particleCount = useStore(s => s.particleCount);
  const setParticleCount = useStore(s => s.setParticleCount);

  const updateProject = (id: number, field: string, value: string) => {
    setProjects(projects.map(p => p.id === id? {...p, [field]: value } : p));
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', top: 20, left: 20, zIndex: 200,
        padding: '10px 16px', borderRadius: 20, border: 'none',
        background: '#333', color: '#fff', fontWeight: 'bold',
        cursor: 'pointer', fontSize: '0.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
      }}>⚙️ الإعدادات</button>

      {open && (
        <div style={{
          position: 'fixed', top: 60, left: 20, right: 20, bottom: 40, zIndex: 250,
          background: 'rgba(20,20,20,0.95)', color: '#eee', padding: 20,
          borderRadius: 16, backdropFilter: 'blur(12px)', fontFamily: 'sans-serif',
          overflowY: 'auto', fontSize: '0.8rem', maxWidth: 400, margin: '0 auto'
        }}>
          <h3 style={{ marginBottom: 16, textAlign: 'center' }}>لوحة التحكم</h3>

          <Section title="الألوان">
            <Label>اللون الرئيسي</Label>
            <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} style={{ width: '100%', padding: 4, borderRadius: 6, border: 'none' }} />
            <Label>لون الخلفية</Label>
            <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} style={{ width: '100%', padding: 4, borderRadius: 6, border: 'none' }} />
          </Section>

          <Section title="المعلومات الشخصية">
            <Label>الاسم بالعربي</Label>
            <Input value={arName} onChange={e => setArName(e.target.value)} />
            <Label>الاسم بالإنجليزي</Label>
            <Input value={enName} onChange={e => setEnName(e.target.value)} />
            <Label>الإيميل</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
            <Label>رقم الهاتف</Label>
            <Input value={phone} onChange={e => setPhone(e.target.value)} />
          </Section>

          <Section title="المشاريع (عدّل العناوين والوصف)">
            {projects.map((p, idx) => (
              <div key={p.id} style={{ marginBottom: 12, borderBottom: '1px solid #444', paddingBottom: 8 }}>
                <Label>عنوان {idx+1}</Label>
                <Input value={p.title} onChange={e => updateProject(p.id, 'title', e.target.value)} />
                <Label>النوع</Label>
                <Input value={p.type} onChange={e => updateProject(p.id, 'type', e.target.value)} />
                <Label>الوصف</Label>
                <Input value={p.info} onChange={e => updateProject(p.id, 'info', e.target.value)} />
              </div>
            ))}
          </Section>

          <Section title="إعدادات متقدمة">
            <Label>سرعة الدوران التلقائي</Label>
            <input type="range" min="0.1" max="2" step="0.1" value={autoRotateSpeed} onChange={e => setAutoRotateSpeed(parseFloat(e.target.value))} style={{ width: '100%' }} />
            <small>{autoRotateSpeed}</small>

            <Label>مستوى الصوت</Label>
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={e => setVolume(parseFloat(e.target.value))} style={{ width: '100%' }} />
            <small>{volume}</small>

            <Label>إظهار الجزيئات</Label>
            <input type="checkbox" checked={showParticles} onChange={e => setShowParticles(e.target.checked)} />

            <Label>لغة المرشد</Label>
            <select value={guideLanguage} onChange={e => setGuideLanguage(e.target.value as 'ar'|'en')} style={{ width: '100%', padding: 6, borderRadius: 6, background: '#222', color: '#fff' }}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>

            <Label>عدد الجزيئات</Label>
            <input type="number" min="10" max="200" value={particleCount} onChange={e => setParticleCount(parseInt(e.target.value) || 50)} style={{ width: '100%', padding: 6, borderRadius: 6, background: '#222', color: '#fff', border: '1px solid #555' }} />
          </Section>

          <button onClick={() => setOpen(false)} style={{
            display: 'block', margin: '20px auto 0', padding: '8px 24px',
            borderRadius: 8, border: 'none', background: '#ffaa00', color: '#000',
            fontWeight: 'bold', cursor: 'pointer'
          }}>إغلاق</button>
        </div>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ marginBottom: 10, color: '#ffaa00' }}>{title}</h4>
      {children}
    </div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', marginTop: 10, marginBottom: 4 }}>{children}</label>;
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ width: '100%', padding: 6, borderRadius: 6, background: '#222', color: '#fff', border: '1px solid #555' }} />;
}
