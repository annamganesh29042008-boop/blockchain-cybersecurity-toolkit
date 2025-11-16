import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4" style={{color:'var(--accent)'}}>Blockchain & Cybersecurity Toolkit</h1>
      <p className="text-slate-300 mb-6">A teaching demo combining file verification, URL scanning, and a tamper simulator.</p>
      <div className="grid grid-cols-3 gap-6">
        <Link to="/file" className="p-6 rounded-lg" style={{background:'var(--card)'}}>
          <h3 className="text-xl font-semibold">File Verify</h3>
          <p className="text-slate-400">Upload and store file hashes on the blockchain.</p>
        </Link>
        <Link to="/url" className="p-6 rounded-lg" style={{background:'var(--card)'}}>
          <h3 className="text-xl font-semibold">URL Scanner</h3>
          <p className="text-slate-400">Simple heuristics to detect suspicious URLs.</p>
        </Link>
        <Link to="/sim" className="p-6 rounded-lg" style={{background:'var(--card)'}}>
          <h3 className="text-xl font-semibold">Simulator</h3>
          <p className="text-slate-400">Create transactions and tamper blocks for demo.</p>
        </Link>
      </div>
    </div>
  )
}
