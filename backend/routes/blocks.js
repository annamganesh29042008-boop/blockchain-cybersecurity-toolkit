const express = require('express');
const router = express.Router();
const Block = require('../models/Block');
const { validateChain } = require('../utils/blockUtils');
router.get('/', async (req,res)=>{
  const blocks = await Block.find().sort({ index: 1 });
  res.json({ blocks });
});
router.get('/validate', async (req,res)=>{
  const blocks = await Block.find().sort({ index: 1 });
  res.json({ valid: validateChain(blocks) });
});
module.exports = router;
