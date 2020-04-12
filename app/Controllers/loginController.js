const commonController = require('../Controllers/commonController');
const Response = require('../Middleware/response');
const crypt = require('bcryptjs');
const cookie     = require('cookie-parser');
const jwt = require('jsonwebtoken');

let loginController = {};
loginController.userLogin = async function (req, res) {
    try {
        if(!req || !req.body || !req.body.email || !req.body.password) {
            Response.sendErrorResponse(req, res, ['Missing Params -------> Email, Password']);
        }
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        let result = await commonController.findInDb({'email': userEmail}, 'login_user_details', ['id', 'password']);
        if (!result) {
            Response.sendErrorResponse(req, res, ['Result Not Found']);
        }
        var passwordIsValid = crypt.compareSync(userPassword, result[0].password);
        let user_id = result[0].id;
        if(!passwordIsValid){
            return sendErrorResponse(req, res, [{auth: false, token: null}]);
        }
        let generateJsonWebTokken = await loginController.jwtAuth(req, res, user_id);
        res.cookie('auth',generateJsonWebTokken.token);
        Response.sendSuccessResponse(req, res, ['tokken Successfully Generated For Login User'], result);
    } catch (error) {
        Response.sendErrorResponse(req, res, error);
    }
}
loginController.jwtAuth = function (req, res, user_id) {
    return new Promise((resolve, reject) => {
        try {
            var token = jwt.sign({ id: user_id }, SECRET, {
                expiresIn: 86400 // expires in 24 hours
              });
              return resolve({ auth: true, token: token })
        } catch (error) {
            reject(error);
        }
    });
}
loginController.verifyJwtForLoginUser = function(req ,res) {
    return new  Promise ((resolve, reject) => {
        try {
            console.log("jwt tokken=====>", req.cookies.auth);
            var jwtTokken = req.cookies.auth;
            jwt.verify(jwtTokken, SECRET, function(err, decoded) {
                if (err) return Response.sendErrorResponse(req, res, [{ auth: false, message: 'Failed to authenticate token.' }]);
                Response.sendSuccessResponse(req, res, ['Tokken Successfully verify'], decoded);
              });
        } catch (error) {
            
        }
    });
}
loginController.userLogout = function(req, res) {
    try {
        res.clearCookie('auth');
        // console.log(res.cookie());
        // console.log(req.cookies.auth);
        res.status(200).send("User Successfully logout");
    } catch (error) {
       
    }
}
module.exports = loginController;