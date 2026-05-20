function App() {
  const handleResponse = (type) => {
    alert('دوست على ' + type)
  }

  return (
    <div style={{padding: 20, fontFamily: 'sans-serif'}}>
      <h1>متحف العقل</h1>
      <button 
        onClick={() => handleResponse('برمجة')} 
        style={{ padding:'8px 18px', borderRadius:8, border:'none', background:'#ffaa00', color:'#000', fontWeight:'bold', cursor:'pointer' }}
      >
        💻 برمجة
      </button>
    </div>
  )
}

export default App
