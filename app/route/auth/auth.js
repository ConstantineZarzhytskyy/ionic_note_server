var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var authUtils = require('../../route/auth/authUtils');
var User = configDb.User;
var tokenUtils = require('../tokenUtils');

router.route('/login')
    .post(function (req, res) {
      var user = req.body.user;

      User.findOne({ email: user.email }, function (err, userDB) {
        if (err) { return res.send(err); }
        if (!userDB) { return res.status(401).send({err: 'User not exist'}); }
        if (!authUtils.isValidPassword(userDB, user.password)) {
          return res.status(401).send({ err: 'invalid user' });
        }

        res.send({ user: userDB, token: tokenUtils.createJWT(userDB) });
      });
    });

router.route('/register')
    .post(function (req, res) {
      var userInfo = req.body.user;

      User.findOne({ UUID: UUID }, function (err, user) {
        if (err) { return res.send(err); }
        if (user) {
          User.update({ UUID: UUID }, function (err, userDb) {
            if (err) { return res.send(err); }

            return res.send({ user: userDb, token: tokenUtils.createJWT(userDb) });
          })
        }

        var newUser = new User();
        newUser.email = userInfo.email;
        newUser.password = authUtils.createHash(userInfo.password);

        newUser.save(function (err, userDB) {
          if (err) { return res.send(err); }

          res.json(userDB);
        });
      });
    });

router.route('/user')
    .get(function (req, res) {
      var userId = req.user;

      User.findOne({ userId: userId }, function (err, userDB) {
        if (err) { return res.send(err); }

        res.json(userDB);
      });
    });

router.route('/UUID/:UUID')
    .get(function (req, res) {
      var UUID = req.params.UUID;

      User.findOne({ UUID: UUID }, function (err, user) {
        if (err) { return res.send(err); }
        if (!user) {
          var newUser = new User();
          newUser.UUID = UUID;

          newUser.save(function (err, userDB) {
            if (err) { return res.send(err); }

            return res.send({ user: userDB, token: tokenUtils.createJWT(userDB) });
          });
        } else {
          return res.send({ user: user, token: tokenUtils.createJWT(user) });
        }
      })
    });

module.exports = router;
