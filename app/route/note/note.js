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
      newNote.markerId = note.markerId;
      newNote.title = note.title;
      newNote.description = note.description;
      newNote.dateCreate = dateCreate.toUTCString();
      newNote.dateNotification = note.dateNotification;
      newNote.timeNotification = note.timeNotification;
      newNote.picture.data = note.picture;
      newNote.picture.contentType = 'image/png';

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
          done: newNote.done,
          description: newNote.description,
          folderId: newNote.folderId,
          markerId: newNote.markerId,
          dateNotification: newNote.dateNotification,
          timeNotification: newNote.timeNotification
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
