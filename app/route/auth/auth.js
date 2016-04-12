var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var authUtils = require('../../route/auth/authUtils');
var User = configDb.User;

router.route('/login')
    .post(function (req, res) {
      var user = req.body.user;

      User.findOne({email: user.email}, function (err, userDB) {
        if (err) { return res.send(err); }
        if (!userDB) { return res.status(401).send({err: 'User not exist'}); }
        if (!authUtils.isValidPassword(userDB, user.password)) {
          return res.status(401).send({ err: 'invalid user' });
        }

        res.send(userDB);
      });
    });

module.exports = router;
