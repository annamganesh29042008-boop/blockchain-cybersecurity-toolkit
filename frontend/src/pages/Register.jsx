import React, {useState} from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'
export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const nav = useNavigate();
  const submit = async()=>{
    const r = await API.post('/auth/register', { name, email, password });
    localStorage.setItem('token', r.data.token); nav('/');
  }
  return (
    <div>
      <h2>Register</h2>
      <input onChange={e=>setName(e.target.value)} placeholder="name" />
      <input onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
      <button onClick={submit}>Register</button>
    </div>
  )
}
