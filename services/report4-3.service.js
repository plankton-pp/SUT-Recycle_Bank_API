const conn = require('../config/dbConfig')



etSumOfDepoAndWithd = (year) => {
    return new Promise(async (resolve, reject) => {
            try {
                const sql = "SELECT Firstname, Lastname, T.Type, P.Net_Price FROM members M JOIN Transactions T ON T.Place_Members_ID = M.ID JOIN place P ON P.Place_ID = T.Place_ID WHERE T.Type = 'deposit' OR T.type = 'withdraw' ";

                const result = await conn.query(sql, [year]);
                resolve(result);
            } catch (e) {
                reject(e);
            }
    });
};



module.exports = {
    getSumOfDepoAndWithd,
    
};
