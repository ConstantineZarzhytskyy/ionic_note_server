var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var User = configDb.User;

router.route('/info')
    .get(function (req, res) {
      var user = req.user;
      if (user.isLogged) { return res.end(); }

      User.findOne({ userId: user._id }, function (err, userDB) {
        if (err) { return res.send(err); }

        res.json(userDB);
      });
    });

module.exports = router;
