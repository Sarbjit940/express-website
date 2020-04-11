const nodeMailer = require('nodemailer'); 
const Nexmo = require('nexmo');
let commonController = {};

commonController.updatetable = function (updateTableObj, tableName, id, whereColumn = 'id') {
    return new Promise((resolve, reject) => {
        try {
            let query = `UPDATE ${tableName} SET`
        } catch (error) { }
    })
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
    console.log("smsObj========>", smsObj);
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
module.exports = commonController
