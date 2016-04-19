var jwt = require('jsonwebtoken');
var moment = require('moment');
var credentials = require('../app.config');

function createJWT(user) {
  var payload = {
    _id: user._id,
    UUID: user.UUID,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.sign(payload, credentials.TOKEN_SECRET);
}

function decodeJWT(token) {
  return jwt.decode(token);
}

module.exports.createJWT = createJWT;
module.exports.decodeJWT = decodeJWT;
