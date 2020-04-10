const Response = require('../Middleware/response')
const adminModel = require('../models/adminModel')
const commonController = require('../Controllers/commonController')
let adminController = {}

adminController.index = async function (req, res) {
  try {
    if (!req.query || !req.query.name || !req.query.email || !req.query.mobile_no) {
      return Response.sendErrorResponse(req, res, ['Missing data {"name", "email", "mobileno"}']);
    }
    let name = req.query.name;
    let email = req.query.email;
    let mobile_no = req.query.mobile_no;
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

adminController.sendInfo = async (req, res) => {
  try {
    if (!req.query || !req.query.text || req.query.user_mail) {
      return Response.sendErrorResponse(req, res, ['Missing data {"user_email", "text"}']);
    }
    let user_email = req.query.user_email;
    let text = req.query.text;
    let mailObj = {
      from: FROM,
      to: user_email,
      subject: SUBJECT,
      text: text
    };
    let result = await commonController.sendEmail(mailObj);
    let mailResponse = result.mailResult.response
    return Response.sendSuccessResponse(req, res, ['Mail Successfully Sent'], mailResponse);
  } catch (error) {
    console.error("sendInfoError========>", error);
    Response.sendErrorResponse(req, res, error);
  }
}
module.exports = adminController
