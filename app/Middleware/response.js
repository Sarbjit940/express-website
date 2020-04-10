
var sendErrorResponse = function(req, res, error, code) {
    code = code ? code : 40;
    let responseObj = {
        code : code ,
        error: error || ['Error']
    }
    res.status(500).send(responseObj);
}
var sendSuccessResponse = function(req, res, message, data, code) {
    code = code ? code : 20;
    let responseObj = {
        code : code ,
        message: message ? message : ['Successfully Fetched'],
        data : data ? data : []
    }
    res.status(200).send(responseObj);
}
module.exports = {
    sendErrorResponse: sendErrorResponse,
    sendSuccessResponse: sendSuccessResponse
}