const commonController = require('../Controllers/commonController');
const Response = require('../Middleware/response');
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let registerController = {};

registerController.addUser = async function (req, res) {
    try {
        console.log(req.headers);
        let validate_result = commonController.validateReqBody(req.body, ['name', 'email', 'password'], 'user');
        if (validate_result) {
            return Response.sendErrorResponse(req, res, [`Missing Params are-----> ${validate_result}`]);
        }
        var hashedPassword = crypt.hashSync(req.body.user.password, 8);
        let name = req.body.user.name;
        let email = req.body.user.email;
        let password = hashedPassword;
        let userObj = {
            name: name,
            email: email,
            password: password
        }
        let result = await commonController.insertInDb(userObj, 'login_user_details');
        if (!result) {
            Response.sendErrorResponse(req, res, ['Result Not Found']);
        }
        let user = await commonController.findInDb({ 'name': name }, 'login_user_details', ['id']);
        if (!user) {
            Response.sendErrorResponse(req, res, ['Id Not Found']);
        }
        let user_id = user[0].id;
        let generateJsonWebTokken = await registerController.jwtAuth(req, res, user_id);
        res.cookie('auth',generateJsonWebTokken.token);
        Response.sendSuccessResponse(req, res, ['Successfully Register'], result);
    } catch (error) {
        Response.sendErrorResponse(req, res, error);
    }
}
registerController.jwtAuth = function (req, res, user_id) {
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
registerController.verifyJwt = function(req ,res) {
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
module.exports = registerController;