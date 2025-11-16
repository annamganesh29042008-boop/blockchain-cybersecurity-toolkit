const crypto = require('crypto');
function calculateHash(index, previousHash, timestamp, data, nonce){
  const str = index + previousHash + timestamp + JSON.stringify(data) + nonce;
  return crypto.createHash('sha256').update(str).digest('hex');
}
async function mineBlock(block, difficulty){
  let target = '0'.repeat(difficulty);
  while(!block.hash || block.hash.substring(0,difficulty) !== target){
    block.nonce = (block.nonce || 0) + 1;
    block.hash = calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.nonce);
  }
  return block;
}
function validateChain(blocks){
  for(let i=1;i<blocks.length;i++){
    const prev = blocks[i-1];
    const cur = blocks[i];
    if(cur.previousHash !== prev.hash) return false;
    const recal = calculateHash(cur.index, cur.previousHash, cur.timestamp, cur.data, cur.nonce);
    if(recal !== cur.hash) return false;
  }
  return true;
}
module.exports = { calculateHash, mineBlock, validateChain };
