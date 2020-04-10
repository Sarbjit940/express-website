
var sendErrorResponse = function(req, res, error, code) {
    code = code ? code : 40;
    let responseObj = {
        code : code ,
        error: error || ['Error']
    }
    res.status(500).send(responseObj);
}


module.exports = {
    sendErrorResponse: sendErrorResponse
}