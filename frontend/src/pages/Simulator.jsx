import React, {useState, useEffect} from 'react'
import API from '../api/api'
export default function Simulator(){
  const [tx, setTx] = useState({from:'', to:'', amount:0});
  const [blocks, setBlocks] = useState([]);
  useEffect(()=>{ load() },[]);
  const load = async()=>{ const r = await API.get('/blocks'); setBlocks(r.data.blocks); }
  const create = async()=>{ const token = localStorage.getItem('token'); await API.post('/tx/create', tx, { headers:{ Authorization:`Bearer ${token}` }}); load(); }
  const tamper = async(i)=>{ const token = localStorage.getItem('token'); await API.post(`/tx/tamper/${i}`, {}, { headers:{ Authorization:`Bearer ${token}` }}); load(); }
  return (
    <div>
      <h2 className="text-2xl" style={{color:'var(--accent)'}}>Simulator</h2>
      <div className="mt-4 p-4" style={{background:'var(--card)'}}>
        <input placeholder="from" onChange={e=>setTx({...tx, from:e.target.value})} />
        <input placeholder="to" onChange={e=>setTx({...tx, to:e.target.value})} />
        <input type="number" placeholder="amount" onChange={e=>setTx({...tx, amount:Number(e.target.value)})} />
        <button onClick={create}>Create TX</button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl">Blocks</h3>
        {blocks.map(b=> (
          <div key={b.index} className="p-3 my-2" style={{background:'#061018'}}>
            <div>Index: {b.index} — Hash: {b.hash?.substring(0,20)}...</div>
            <button onClick={()=>tamper(b.index)}>Tamper</button>
          </div>
        ))}
      </div>
    </div>
  )
}
