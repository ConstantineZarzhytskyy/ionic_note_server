var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var Folder = configDb.Folder;

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

module.exports = router;
