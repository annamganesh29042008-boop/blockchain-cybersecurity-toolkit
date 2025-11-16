const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileRecordSchema = new Schema({
  filename: String,
  originalname: String,
  hash: String,
  uploader: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date
});
module.exports = mongoose.model('FileRecord', FileRecordSchema);
