var express = require('express');
var router = express.Router();
var configDb = require('../../db/db.config');
var Marker = configDb.Marker;

router.route('/')
    .get(function (req, res) {
      var userId = req.user;

      Marker.find({ userId: userId }, function (err, markers) {
        if (err) { return res.send(err); }

        res.json(markers);
      });
    })
    .post(function (req, res) {
      var userId = req.user;
      var marker = req.body.marker;

      var newMarker = new Marker();
      newMarker.title = marker.title;
      newMarker.userId = userId;
      newMarker.lat = marker.lat;
      newMarker.lng = marker.lng;

      newMarker.save(function (err, marker) {
        if (err) { return res.send(err); }

        res.json(marker);
      })
    });

router.route('/:markerId')
    .put(function (req, res) {
      var userId = req.user;
      var markerId = req.params.markerId;
      var newMarker = req.body.marker;

      Marker.update({ _id: markerId },
          {
            $set: {
              title: newMarker.title,
              userId: userId,
              lat: newMarker.lat,
              lng: newMarker.lng
            }
          }, function (err) {
        if (err) { return res.send(err); }

        res.end();
      });
    })
    .delete(function (req, res) {
      var markerId = req.params.markerId;

      Marker.remove({ _id: markerId }, function (err) {
        if (err) {  return res.send(err); }

        res.end();
      })
    });

module.exports = router;
