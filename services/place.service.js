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

addPlace = (memid, plcby, status, empid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `place` (`Place_ID`, `Member_ID`, `Place_By`, `Status`, `Create_Date`, `Update_Date`, `Employee_ID`) VALUES (NULL, '1', '1', '1', current_timestamp(), current_timestamp(), '1');";
            const result = await conn.query(sql, [memid, plcby, status, empid]);
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

updatePlaceById = (memid, plcby, status, empid, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE place SET Member_ID = ?,Place_By = ?,Status = ?, Employee_ID = ? WHERE Place_ID = ?";
            const result = await conn.query(sql, [memid, plcby, status, empid, id]);
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
};
