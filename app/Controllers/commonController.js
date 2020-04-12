const nodeMailer = require('nodemailer'); 
const Nexmo = require('nexmo');
let commonController = {};

commonController.updateTable = function(updateObject, tableName, id, whereColumnName = 'id'){
    return new Promise( async function(resolve, reject) {
      try{
         let query = `UPDATE ${tableName} SET `;
         let valueArray = [];
         let columnValue = [];
         for (var key in updateObject) {
          if (updateObject.hasOwnProperty(key)) {
            columnValue.push('`'+key+'` = ? ');
            valueArray.push(updateObject[key]);
          }
         }
        query += columnValue.join(", ")+` where ${whereColumnName} = ? `;
        valueArray.push(id);
        let result = await queryExecutePromissified(query,valueArray); 
        resolve(result.changedRows || 0);
      }catch(e){
        reject(e);
      }
    });
}

commonController.insertInDb = function (insertObj, tableName) {
    return new Promise(async (resolve, reject) => {
        try {
            let query = `INSERT INTO ${tableName} `;
            let columns = [];
            let values = [];
            let valuesArrays = [];
            for (var key in insertObj) {
                columns.push(key);
                values.push('?');
                valuesArrays.push(insertObj[key]);
            }
            query += `( ${columns.join(', ')}) VALUES (${values.join(', ')} )`;
            let result = await queryExecutePromissified(query, valuesArrays);
            resolve(result || 0);
        } catch (error) {
            reject(error)
        }
    })
}

commonController.sendEmail = function (mailObj) {
    return new Promise ( async (resolve, reject)=>{
        try {
           var transporter = nodeMailer.createTransport({
                service: SERVICE,
                auth: {
                    user: SENDER.MAIL,
                    pass: SENDER.PASS
                }
           }); 
           let mailResult = await transporter.sendMail(mailObj);
           resolve({mailResult});
        } catch (error) {
            reject(error);
        }
    });
}
commonController.sendSMS = function (smsObj) {
    return new Promise(async (resolve, reject) => {
        try {
            const nexmo = new Nexmo({
                apiKey: NEXMO_API_KEY,
                apiSecret: NEXMO_API_SECRET
            });
          nexmo.message.sendSms(smsObj.from, smsObj.to, smsObj.text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                    resolve(responseData);
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    reject(responseData);
                }
            }
        });
        } catch (error) {
            console.log("error=======>" , error);
            reject(error);
        }
    });
}
commonController.findInDb = function(condition, tableName, fields, delimeter = ' OR ') {
    return new Promise(async function(resolve, reject) {
        try {
            if (!condition) {
               return reject('please provide condition');
            }
            let conditionArray = [];
            let valueArray = [];
            for (var key in condition) {
                if (condition.hasOwnProperty(key)) {
                    conditionArray.push(key + ' = ?');
                    valueArray.push(condition[key]);
                }
            }
            let query = `SELECT ${fields.join()} FROM ${tableName} where ` + (conditionArray).join(`${delimeter}`);
            let result = await queryExecutePromissified(query, valueArray);
            resolve(result);
        } catch (e) {
            return reject(e);
        }
    });
}
commonController.sendOtp = function () {
    return new Promise(async(resolve, reject) => {
        try {
            var OTP = Math.floor((Math.random() * 100000) + 1);
            let smsObj = {
                from: SMS_FROM,
                to: SMS_TO,
                text: `OTP For Mobile Verification ${OTP}`
            }
            // await commonController.insertInDb(OTP, "users");
            await commonController.sendSMS(smsObj);
            resolve(['Otp Send Successfully']);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
commonController.deleteInDb = function(tableName, whereColumnValue, whereColumnName = 'id'){
    return new Promise(async (resolve, reject) => {
      try{
        let query = `DELETE FROM ${tableName} `;
          query += `WHERE ${whereColumnName} = ? `;
          let result = await queryExecutePromissified(query, [whereColumnValue]);
          resolve(result['affectedRows'] || 0);
      } catch(err){
        reject(err);
      }
    });
  }

  commonController.validateReqBody = function(req, req_data, key) {
    key = key || 'body';
    if(!req_data.length) {
      return 0;
    }
    let blank_array = [];
    for(let count = 0; count < req_data.length; count++) {
      console.log("Key",key,"Req[key] --> ",req[key],!req[key])
      if( !req[key] ||
        req[key][req_data[count]] === 'undefined'   ||
        req[key][req_data[count]] === undefined   ||
        req[key][req_data[count]] === null   ||
        (typeof req[key][req_data[count]] == 'string' && req[key][req_data[count]].trim() == "") ||
        req[key][req_data[count]] === " " || 
        req[key][req_data[count]] === "") {
        blank_array.push(req_data[count]);
      }
    }
    console.log('array ' , blank_array);
    if(blank_array.length) {
      return blank_array.join(',');
    }
    return 0;
  }
module.exports = commonController
