var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
  title: { type: String, required: true },
  userId: String,
  notes: []
});

module.exports = mongoose.model('Folder', FolderSchema);
