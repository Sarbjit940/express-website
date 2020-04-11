const  path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

var adminController = require('../Controllers/adminController');
var authControleer = require('../Middleware/auth');

router.get('/index', authControleer.apiAuth,  adminController.index);
router.get('/sendInfo', authControleer.apiAuth,  adminController.sendInfo);
router.get('/sendInfoSMS', authControleer.apiAuth,  adminController.sendInfoSMS);

module.exports = router;