let commonController = {}

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
module.exports = commonController
