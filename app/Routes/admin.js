const  path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

var adminController = require('../Controllers/adminController');
router.get('/index', adminController.index);

module.exports = router;