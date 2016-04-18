var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  surname: String,
  UUID: String
});

module.exports = mongoose.model('User', UserSchema);
