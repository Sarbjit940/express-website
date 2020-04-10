const Response = require('../Middleware/response')
const adminModel = require('../models/adminModel')

let adminController = {}

adminController.index = async function (req, res) {
  try {
    if (!req.query || !req.query.name || !req.query.email || !req.query.mobile_no) {
      return Response.sendErrorResponse(req, res, ['Missing data {"name", "email", "mobileno"}']);
    }
    let name = req.query.name
    let email = req.query.email
    let mobile_no = req.query.mobile_no
    let userDetailsObj = {
      name: name,
      email: email,
      mobile_no: mobile_no
    }
    let userResult = await adminModel.userDetails(userDetailsObj);
    return Response.sendSuccessResponse(req, res, userResult.message, userResult.data);
  } catch (error) {
    console.log("adminIndexError =======>", error);
    Response.sendErrorResponse(req, res, error.error);
  }
}

module.exports = adminController
