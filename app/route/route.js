var express = require('express');
var router = express.Router();
var taskAPI = require('./note/note');
var dbConntect = require('../db/db.config');

dbConntect.connectToDataBase();

router.use('/task', taskAPI);

module.exports = router;
