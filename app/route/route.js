var express = require('express');
var router = express.Router();
var noteAPI = require('./note/note');
var folderAPI = require('./folder/folder');
var markerAPI = require('./marker/marker');
var authAPI = require('./auth/auth');
var dbConntect = require('../db/db.config');
var config = require('../app.config');
var jwt = require('express-jwt');
var auth = jwt({ secret: config.TOKEN_SECRET, userProperty: 'user' });

dbConntect.connectToDataBase();

router.use('/notes', auth, noteAPI);
router.use('/folders', auth, folderAPI);
router.use('/markers', auth, markerAPI);
router.use('/auth', authAPI);

module.exports = router;
