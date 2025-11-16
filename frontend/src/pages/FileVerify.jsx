import React, {useState} from 'react'
import API from '../api/api'
export default function FileVerify(){
  const [file,setFile]=useState(null); const [resp,setResp]=useState(null);
  const upload = async()=>{
    if(!file) return alert('choose file');
    const fd = new FormData(); fd.append('file', file);
    const token = localStorage.getItem('token');
    const r = await API.post('/files/upload', fd, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }});
    setResp(r.data);
  }
  return (
    <div>
      <h2 className="text-2xl" style={{color:'var(--accent)'}}>File Verify</h2>
      <input type="file" onChange={e=>setFile(e.target.files[0])} className="mt-4" />
      <button onClick={upload} className="ml-4 px-4 py-2 rounded bg-slate-800">Upload & Add to Chain</button>
      {resp && <pre className="mt-4 p-4" style={{background:'#021018'}}>{JSON.stringify(resp, null, 2)}</pre>}
    </div>
  )
}
