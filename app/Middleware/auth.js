let authController = {};


authController.apiAuth = function (req, res, next) {
  return new Promise ((resolve, reject) => {
    try {
      let api_key = req.query.api_key;
      if (!api_key || api_key != API_KEY) {
        reject ({code: 40, errors: ['Invalid Request']});
      }
    } catch (error) {
      console.log (error);
      reject (error);
    }
  });
};

module.exports = authController;