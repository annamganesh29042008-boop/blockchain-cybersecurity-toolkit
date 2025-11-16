const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Block = require('../models/Block');
const { mineBlock, validateChain } = require('../utils/blockUtils');
router.post('/create', auth, async (req,res)=>{
  const { from, to, amount } = req.body;
  const last = await Block.findOne().sort({ index: -1 });
  const newBlock = {
    index: (last ? last.index + 1 : 0),
    timestamp: new Date(),
    data: { type: 'tx', tx: { from, to, amount } },
    previousHash: last ? last.hash : '0',
    nonce: 0
  };
  const mined = await mineBlock(newBlock, 2);
  await Block.create(mined);
  res.json({ ok:true, block: mined });
});
router.post('/tamper/:index', auth, async (req,res)=>{
  const idx = Number(req.params.index);
  const block = await Block.findOne({ index: idx });
  if(!block) return res.status(404).json({ error:'no block' });
  block.data.tampered = true;
  await block.save();
  const blocks = await Block.find().sort({ index: 1 });
  res.json({ valid: validateChain(blocks) });
});
module.exports = router;
