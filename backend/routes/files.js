const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const FileRecord = require('../models/FileRecord');
const Block = require('../models/Block');
const { mineBlock } = require('../utils/blockUtils');
const upload = multer({ dest: 'uploads/' });
router.post('/upload', auth, upload.single('file'), async (req,res)=>{
  const file = req.file;
  const buf = fs.readFileSync(file.path);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const fr = await FileRecord.create({ filename: file.filename, originalname: file.originalname, hash, uploader: req.user._id, createdAt: new Date() });
  const last = await Block.findOne().sort({ index: -1 });
  const newBlock = {
    index: (last ? last.index + 1 : 0),
    timestamp: new Date(),
    data: { type: 'file', fileId: fr._id, filename: fr.originalname, hash },
    previousHash: last ? last.hash : '0',
    nonce: 0
  };
  const mined = await mineBlock(newBlock, 2);
  await Block.create(mined);
  res.json({ ok: true, fileRecord: fr, block: mined });
});
router.post('/verify', async (req,res)=>{
  const { hash } = req.body;
  const found = await FileRecord.findOne({ hash });
  if(found) return res.json({ ok: true, found });
  res.json({ ok: false });
});
module.exports = router;
