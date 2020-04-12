const  path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

var adminController = require('../Controllers/adminController');
var loginController = require('../Controllers/loginController');
var registerController = require('../Controllers/registerController');
var authController = require('../Middleware/auth');
//testing route
router.get('/index', authController.apiAuth,  adminController.index);
//send info using mail and
router.get('/sendInfo', authController.apiAuth,  adminController.sendInfo);
router.get('/sendInfoSMS', authController.apiAuth,  adminController.sendInfoSMS);

//userRegister
router.post('/Register', authController.apiAuth, registerController.addUser);
router.get('/verifyJwt', authController.apiAuth, registerController.verifyJwt);
//userLogin
router.post('/login', authController.apiAuth, loginController.userLogin);
router.get('/verifyJwtForLoginUser', authController.apiAuth, loginController.verifyJwtForLoginUser);
//userLogout
router.get('/logout', loginController.userLogout);
module.exports = router;