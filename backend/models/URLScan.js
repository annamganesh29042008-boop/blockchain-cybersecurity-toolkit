const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLScanSchema = new Schema({
  url: String,
  result: String,
  score: Number,
  checks: Object,
  requester: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date
});
module.exports = mongoose.model('URLScan', URLScanSchema);
