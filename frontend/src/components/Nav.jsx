import React from 'react'
import { Link } from 'react-router-dom'
export default function Nav(){
  return (
    <nav className="p-4 border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold" style={{color:'var(--accent)'}}>BC Toolkit</Link>
          <Link to="/file" className="text-sm text-slate-400">File Verify</Link>
          <Link to="/url" className="text-sm text-slate-400">URL Scanner</Link>
          <Link to="/sim" className="text-sm text-slate-400">Simulator</Link>
          <Link to="/blocks" className="text-sm text-slate-400">Block Explorer</Link>
        </div>
        <div>
          <Link to="/login" className="px-3 py-1 border rounded text-sm">Login</Link>
        </div>
      </div>
    </nav>
  )
}
