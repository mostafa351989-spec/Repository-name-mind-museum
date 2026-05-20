import { useState } from 'react';
import { useStore } from './store';

export default function ContactCard() {
  const [open, setOpen] = useState(false);
  const arName = useStore(s => s.arName);
  const enName = useStore(s => s.enName);
  const email = useStore(s => s.email);
  const phone = useStore(s => s.phone);
  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: 100, left: 20, zIndex: 200,
        padding: '10px 16px', borderRadius: 20, border: 'none',
        background: '#ffaa00', color: '#000', fontWeight: 'bold',
        cursor: 'pointer', fontSize: '0.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
      }}>📋 بياناتي</button>
      {open && (
        <div style={{
          position: 'fixed', bottom: 160, left: 20, zIndex: 200,
          background: 'rgba(0,0,0,0.85)', color: 'white', padding: 16,
          borderRadius: 16, backdropFilter: 'blur(10px)', fontFamily: 'sans-serif',
          minWidth: 200, fontSize: '0.85rem'
        }}>
          <h3 style={{ marginBottom: 6 }}>{arName}</h3>
          <h4 style={{ marginBottom: 8, color: '#ccc' }}>{enName}</h4>
          <p>📧 {email}</p>
          <p>📱 {phone}</p>
          <button onClick={() => setOpen(false)} style={{
            marginTop: 10, padding: '5px 12px', borderRadius: 6, border: 'none',
            background: '#ffaa00', color: '#000', fontSize: '0.8rem'
          }}>قفل</button>
        </div>
      )}
    </>
  );
}
