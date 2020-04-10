const  path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

var adminController = require('../Controllers/adminController');
var authControleer = require('../Middleware/auth');

router.get('/index', authControleer.apiAuth,  adminController.index);

module.exports = router;