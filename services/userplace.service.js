const conn = require('../config/dbConfig')

getUserplace = (memberid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM `place` WHERE Member_ID = ?";
            const result = await conn.query(sql, [memberid]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getUserplacedetail = (placeid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM `placedetail` WHERE Place_ID = ?";
            const result = await conn.query(sql, [placeid]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getUserplace,
    getUserplacedetail
};