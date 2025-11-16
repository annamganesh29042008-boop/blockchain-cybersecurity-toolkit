const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if(existing) return res.status(400).json({ error: 'Email exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});
router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({ error: 'Invalid' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});
module.exports = router;
