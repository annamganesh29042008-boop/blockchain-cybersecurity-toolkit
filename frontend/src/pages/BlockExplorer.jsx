import React, {useEffect, useState} from 'react'
import API from '../api/api'
export default function BlockExplorer(){
  const [blocks,setBlocks] = useState([]);
  useEffect(()=>{ API.get('/blocks').then(r=>setBlocks(r.data.blocks)) },[]);
  return (
    <div>
      <h2 className="text-2xl" style={{color:'var(--accent)'}}>Block Explorer</h2>
      <div className="mt-4 grid gap-3">
        {blocks.map(b=> (
          <pre key={b.index} className="p-3" style={{background:'#021018'}}>{JSON.stringify(b, null, 2)}</pre>
        ))}
      </div>
    </div>
  )
}
