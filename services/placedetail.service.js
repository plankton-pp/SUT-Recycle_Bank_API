const conn = require('../config/dbConfig')

getPlaceDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM placedetail";
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

addPlaceDetail = (placeid, productid, unit, totalprice) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `placedetail` (`Place_Detail_ID`, `Place_ID`, `Product_ID`, `Unit`, `Total_Price`, `Create_Date`, `Update_Date`) VALUES (NULL, ?, ?, ?, ?, UNIX_TIMESTAMP(NOW()), '')";
            const result = await conn.query(sql, [placeid, productid, unit, totalprice]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deletePlaceDetailById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM placedetail WHERE Place_Detail_ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updatePlaceDetailById = (placeid, productid, unit, totalprice, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE placedetail SET Place_ID = ?, Product_ID = ?, Unit = ?, Total_Price = ?,Update_Date = UNIX_TIMESTAMP(NOW()) WHERE Place_Detail_ID = ?";
            const result = await conn.query(sql, [placeid, productid, unit, totalprice, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getPlaceDetails,
    // getBookById,
    addPlaceDetail,
    deletePlaceDetailById,
    updatePlaceDetailById,
};
