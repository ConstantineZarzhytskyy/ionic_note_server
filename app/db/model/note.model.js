var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  userId: String,
  folderId: String,
  title: String,
  description: { type: String, dafault: '' },
  createDate: String
});

module.exports = mongoose.model('Note', NoteSchema);
