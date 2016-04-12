var express = require('express');
var router = express.Router();
var taskAPI = require('./note/note');
var authAPI = require('./auth/auth');
var dbConntect = require('../db/db.config');
var config = require('../app.config');
var jwt = require('express-jwt');
var auth = jwt({ secret: config.TOKEN_SECRET, userProperty: 'user' });

dbConntect.connectToDataBase();

router.use('/task', auth, taskAPI);
router.use('/auth', authAPI);

module.exports = router;
