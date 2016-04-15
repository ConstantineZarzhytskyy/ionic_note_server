var express = require('express');
var async = require('async');
var router = express.Router();
var configDb = require('../../db/db.config');
var Folder = configDb.Folder;
var Note = configDb.Note;

router.route('/')
    .get(function (req, res) {
      var userId = req.user;

      Folder.find({ userId: userId }, function (err, folders) {
        if (err) { return res.send(err); }

        res.json(folders);
      });
    })
    .post(function (req, res) {
      var folder = req.body.folder;
      var userId = req.user;

      var newFolder = new Folder();
      newFolder.userId = userId;
      newFolder.title = folder.title;

      newFolder.save(function (err) {
        if (err) { return res.send(err); }

        res.end();
      });
    });

router.route('/:folderId')
    .get(function (req, res) {
      var folderId = req.params.folderId;

      async.waterfall([
          getFolder,
          getNotes
      ], function (err, done) {
        if (err) { return res.send(err); }

        res.json(done);
      });

      function getFolder(done) {
        Folder.findOne({ _id: folderId }, function (err, folder) {
          if (err) { return done(err, null); }

          done(null, folder)
        });
      }

      function getNotes(folder, done) {
        Note.find({ folderId: folderId }, function (err, notes) {
          if (err) { return done(err, null); }

          done(null, notes)
        })
      }

    })
    .put(function (req, res) {
      var folderId = req.params.folderId;
      var newFolder = req.body.folder;

      Folder.update({
        _id: folderId
      }, {
        $set: {
          title: newFolder.title
        }
      }, function (err) {
        if (err) { return res.send(err); }

        res.end();
      });
    })
    .delete(function (req, res) {
      var folderId= req.params.folderId;

      async.parallel([
        removeNotes,
        removeFolder
      ], function (err) {
        if (err) { return res.send(err); }

        res.json();
      });

      function removeNotes(done) {
        Note.remove({ folderId: folderId }, function (err) {
          if (err) { return done(err, null) }

          done(null, null);
        })
      }

      function removeFolder(done) {
        Folder.remove({ _id: folderId }, function (err) {
          if (err) { return done(err, null) }

          done(null, null);
        });
      }

    });

router.route('/:folderId/notes')
    .get(function (req, res) {
      var folderId = req.params.folderId;

      Note.find({ folderId: folderId }, function (err, notes) {
        if (err) { return res.send(err); }

        res.json(notes);
      });
    });

module.exports = router;
