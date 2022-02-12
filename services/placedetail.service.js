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

addPlaceDetail = (memberid, placeid,  typeid, typename, productid, productname, productprice, unitdetail, fee, unit, totalprice) => {
    let bankprice = (totalprice*0.1).toFixed(2);
    let memberprice = (totalprice*0.9).toFixed(2);
    totalprice = Number(totalprice).toFixed(2);
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `placedetail` (`Place_Detail_ID`, `Member_ID`, `Place_ID`, `Type_ID`, `Type_Name`, `Product_ID`, `Product_Name`, `Price_per_Unit`, `Unit_detail`, `Fee`, `Unit`, `Total_Price`, `Bank_Price`, `Member_Price`, `Create_Date`, `Update_Date`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP(NOW()), '');";
            const result = await conn.query(sql, [memberid, placeid,  typeid, typename, productid, productname, productprice, unitdetail, fee, unit, totalprice, bankprice, memberprice]);
            console.log("result",memberid);
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

updatePlaceDetailById = (memberid, placeid,  typeid, typename, productid, productname, productprice, unitdetail,  fee, unit, totalprice, placedetailid) => {
    let bankprice = (totalprice*0.1).toFixed(2);
    let memberprice = (totalprice*0.9).toFixed(2);
    totalprice = Number(totalprice).toFixed(2);
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE `placedetail` SET `Member_ID` = ?,`Place_ID` = ?, `Type_ID` = ?, `Type_Name` = ?, `Product_ID` = ?, `Product_Name` = ?, `Price_per_Unit` = ?, `Unit_detail` = ?,  `Fee` = ?, `Unit` = ?, `Total_Price` = ?, `Bank_Price` = ?, `Member_Price` = ?, `Update_Date` = UNIX_TIMESTAMP(NOW()) WHERE `placedetail`.`Place_Detail_ID` = ?;";
            const result = await conn.query(sql, [memberid, placeid,  typeid, typename, productid, productname, productprice, unitdetail, fee, unit, totalprice, bankprice, memberprice, placedetailid]);
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
