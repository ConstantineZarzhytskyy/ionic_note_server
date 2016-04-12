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
    })
    .post(function (req, res) {
      var note = req.body.note;
      var newNote = new Note();
      newNote.title = note.title;
      newNote.description = note.description;

      newNote.save(function (err) {
        if (err) { return res.send(err); }

        res.end();
      });
    });

module.exports = router;
