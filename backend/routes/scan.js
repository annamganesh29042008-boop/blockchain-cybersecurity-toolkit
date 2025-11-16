const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const URLScan = require('../models/URLScan');
const Block = require('../models/Block');
const { mineBlock } = require('../utils/blockUtils');
function simpleUrlChecks(url){
  const checks = {};
  try{
    const u = new URL(url);
    checks.https = (u.protocol === 'https:');
    checks.host = u.hostname;
    checks.susKeywords = ['login','verify','secure','account','update'].filter(k=>url.includes(k));
  }catch(e){ checks.invalid = true }
  let score = 100;
  if(!checks.https) score -= 40;
  if(checks.susKeywords && checks.susKeywords.length) score -= 30;
  return { checks, score };
}
router.post('/url', auth, async (req,res)=>{
  const { url } = req.body;
  const { checks, score } = simpleUrlChecks(url);
  let result = 'SAFE';
  if(score < 70) result = 'SUSPICIOUS';
  if(score < 40) result = 'DANGEROUS';
  const scan = await URLScan.create({ url, result, score, checks, requester: req.user._id, createdAt: new Date() });
  const last = await Block.findOne().sort({ index: -1 });
  const newBlock = {
    index: (last ? last.index + 1 : 0),
    timestamp: new Date(),
    data: { type: 'urlscan', scanId: scan._id, url, result, score },
    previousHash: last ? last.hash : '0',
    nonce: 0
  };
  const mined = await mineBlock(newBlock, 2);
  await Block.create(mined);
  res.json({ ok:true, scan, block: mined });
});
module.exports = router;
