import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import FileVerify from './pages/FileVerify'
import URLScanner from './pages/URLScanner'
import Simulator from './pages/Simulator'
import BlockExplorer from './pages/BlockExplorer'
import Login from './pages/Login'
import Register from './pages/Register'
export default function App(){
  return (
    <div className="min-h-screen text-white" style={{background:'var(--bg)'}}>
      <Nav />
      <div className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/file" element={<FileVerify/>} />
          <Route path="/url" element={<URLScanner/>} />
          <Route path="/sim" element={<Simulator/>} />
          <Route path="/blocks" element={<BlockExplorer/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </div>
  )
}
