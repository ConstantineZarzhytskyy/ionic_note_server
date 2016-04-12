var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var authUtils = require('../../route/auth/authUtils');
var User = configDb.User;
var tokenUtils = require('../tokenUtils');

router.route('/login')
    .post(function (req, res) {
      var user = req.body.user;

      User.findOne({email: user.email}, function (err, userDB) {
        if (err) { return res.send(err); }
        if (!userDB) { return res.status(401).send({err: 'User not exist'}); }
        if (!authUtils.isValidPassword(userDB, user.password)) {
          return res.status(401).send({ err: 'invalid user' });
        }

        res.send({ user: userDB, token: tokenUtils.createJWT(userDB._id) });
      });
    });

router.route('/register')
    .post(function (req, res) {
      var user = req.body.user;
      var newUser = new User();
      newUser.email = user.email;
      newUser.password = authUtils.createHash(user.password);

      newUser.save(function (err, userDB) {
        if (err) { return res.send(err); }

        res.json(userDB);
      });
    });

module.exports = router;
