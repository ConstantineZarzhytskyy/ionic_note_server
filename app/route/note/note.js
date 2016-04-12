var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var Note = configDb.Note;

router.route('/')
    .get(function (req, res) {
      var userId = req.user;

      Note.find({ userId: userId }, function (err, notes) {
        if (err) { return res.send(err); }

        res.json(notes);
      });
    });

module.exports = router;
