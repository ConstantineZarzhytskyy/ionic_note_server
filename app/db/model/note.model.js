var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  userId: String,
  folderId: String,
  markerId: String,
  title: String,
  description: { type: String, dafault: '' },
  dateCreate: String,
  done: { type: Boolean, default: false },
  dateNotification: String,
  timeNotification: String,
  picture: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Note', NoteSchema);
