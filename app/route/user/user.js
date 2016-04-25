var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var User = configDb.User;

router.route('/info')
    .get(function (req, res) {
      var user = req.user;

      User.findOne({ _id: user._id }, function (err, userDB) {
        if (err) { return res.send(err); }

        res.json(userDB);
      });
    });

module.exports = router;
