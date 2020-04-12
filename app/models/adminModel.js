const commonController = require('../Controllers/commonController')
let adminModel = {};

adminModel.userDetails = function(userDetail) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await commonController.insertInDb(userDetail, "users");
      resolve(user);
    } catch (error) {
      console.log("error =========>", error);
      return reject(error);
    }
  });
};

module.exports = adminModel;
