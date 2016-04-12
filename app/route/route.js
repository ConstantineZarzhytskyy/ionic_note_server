var express = require('express');
var router = express.Router();
var taskAPI = require('./note/note');
var authAPI = require('./auth/auth');
var dbConntect = require('../db/db.config');

dbConntect.connectToDataBase();

router.use('/task', taskAPI);
router.use('/auth', authAPI);

module.exports = router;
