const conn = require('../config/dbConfig')

getPlaces = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM place";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

// getBookById = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const sql = "SELECT * FROM books WHERE id = ?";
//             const result = await conn.query(sql, [id]);
//             resolve(result);
//         } catch (e) {
//             reject(e);
//         }
//     });
// };

addPlace = (memid, placeby, netprice, status, empid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `place` (`Place_ID`, `Member_ID`, `Place_By`, `Net_Price`, `Status`, `Create_Date`, `Update_Date`, `Employee_ID`) VALUES (NULL, ?, ?, ?, ?, UNIX_TIMESTAMP(NOW()), '', ?);";
            const result = await conn.query(sql, [memid, placeby, netprice, status, empid]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deletePlaceById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM place WHERE Place_ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updatePlaceById = (memid, placeby, netprice, status, empid, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE place SET Member_ID = ?,Place_By = ?,Status = ?,Net_Price = ?, Employee_ID = ?,Update_Date = UNIX_TIMESTAMP(NOW()) WHERE Place_ID = ?";
            const result = await conn.query(sql, [memid, placeby, netprice, status, empid, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updatePlaceById2 = (status, memid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE place SET Status = ?, Update_Date = UNIX_TIMESTAMP(NOW()) WHERE Member_ID = ?";
            const result = await conn.query(sql, [status, memid]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getLastplace = (memid,placeid,status,datenow,empid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT Place_ID FROM `place` WHERE Member_ID = ? and Place_By = ? and Status = ? and Create_Date < ? and Employee_ID =? Order by Create_Date desc limit 1 ";
            const result = await conn.query(sql, [memid,placeid,status,datenow,empid]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getPlaces,
    // getBookById,
    addPlace,
    deletePlaceById,
    updatePlaceById,
    updatePlaceById2,
    getLastplace
};
