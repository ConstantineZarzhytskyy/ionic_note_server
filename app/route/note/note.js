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
      var userId = req.user;
      var dateCreate = new Date();

      var newNote = new Note();
      newNote.userId = userId;
      newNote.folderId = note.folderId;
      newNote.title = note.title;
      newNote.description = note.description;
      newNote.dateCreate = dateCreate.getFullYear() + '-' + dateCreate.getMonth() + '-' + dateCreate.getDate();

      newNote.save(function (err) {
        if (err) { return res.send(err); }

        res.end();
      });
    });

router.route('/:noteId')
    .get(function (req, res) {
      var noteId = req.params.noteId;

      Note.findOne({ _id: noteId }, function (err, note) {
        if (err) { return res.send(err); }

        res.json(note);
      });
    })
    .put(function (req, res) {
      var noteId = req.params.noteId;
      var newNote = req.body.note;

      Note.update({
        _id: noteId
      }, {
        $set: {
          title: newNote.title,
          description: newNote.description,
          folderId: newNote.folderId
        }
      }, function (err) {
        if (err) { return res.send(err); }

        res.end();
      });
    })
    .delete(function (req, res) {
      var noteId = req.params.noteId;

      Note.remove({
        _id: noteId
      }, function (err) {
        if (err) { return res.send(err); }

        res.end();
      });
    });

module.exports = router;
