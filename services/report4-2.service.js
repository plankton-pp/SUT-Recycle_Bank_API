const conn = require('../config/dbConfig')

getUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT ID, Concat(Firstname,' ',Lastname) as Name FROM `members`";
            const result = await conn.query(sql);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getUserplacedetail = (placeid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `SELECT * FROM (SELECT Product_ID,Name FROM product) 
            e LEft JOIN (SELECT Product_ID,sum(Unit) FROM placedetail ,place WHERE placedetail.Place_ID = place.Place_ID AND place.Place_ID = ? GROUP BY Product_ID) f
            ON e.Product_ID = f.Product_ID`;
            const result = await conn.query(sql, [placeid]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getUser,
    getUserplacedetail
};