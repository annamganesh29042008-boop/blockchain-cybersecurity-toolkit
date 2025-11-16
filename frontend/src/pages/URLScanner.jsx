import React, {useState} from 'react'
import API from '../api/api'
export default function URLScanner(){
  const [url,setUrl]=useState(''); const [resp,setResp]=useState(null);
  const scan = async()=>{
    const token = localStorage.getItem('token');
    const r = await API.post('/scan/url', { url }, { headers: { Authorization: `Bearer ${token}` } });
    setResp(r.data);
  }
  return (
    <div>
      <h2 className="text-2xl" style={{color:'var(--accent)'}}>URL Scanner</h2>
      <div className="mt-4">
        <input className="p-2 rounded bg-slate-900" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com" />
        <button className="ml-2 px-3 py-2 rounded" onClick={scan}>Scan</button>
      </div>
      {resp && <pre className="mt-4 p-4" style={{background:'#021018'}}>{JSON.stringify(resp, null, 2)}</pre>}
    </div>
  )
}
