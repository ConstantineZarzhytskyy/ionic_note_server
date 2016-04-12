var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
  title: { type: String, required: true },
  userId: String
});

module.exports = mongoose.model('Folder', FolderSchema);
