const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlockSchema = new Schema({
  index: Number,
  timestamp: Date,
  data: Schema.Types.Mixed,
  previousHash: String,
  hash: String,
  nonce: Number
});
module.exports = mongoose.model('Block', BlockSchema);
