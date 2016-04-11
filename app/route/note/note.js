var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var Note = configDb.Note;

router.route('/')
    .get(function (req, res) {

      Note.find(function (err, tasks) {
        if (err) { return res.send(err); }

        res.json(tasks);
      });
    });


module.exports = router;