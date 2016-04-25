var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarkerSchema = new Schema({
  userId: String,
  noteId: String,
  title: String,
  lat: String,
  lng: String
});

module.exports = mongoose.model('Marker', MarkerSchema);
