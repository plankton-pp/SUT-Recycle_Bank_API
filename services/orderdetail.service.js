const conn = require('../config/dbConfig')

getOrderDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM order_detail";
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

addOrderDetail = (plcid, prdid, weight, totalprice) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `order_detail` (`Detail_ID`, `Place_ID`, `Product_ID`, `Weight`, `Total_Price`, `Create_Date`, `Update_Date`) VALUES (NULL, ?, ?, ?, ?, current_timestamp(), current_timestamp())";
            const result = await conn.query(sql, [plcid, prdid, weight, totalprice]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteOrderDetailById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM order_detail WHERE Detail_ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateOrderDetailById = (plcid, prdid, weight, totalprice, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE order_detail SET Place_ID = ?, Product_ID = ?, Weight = ?, Total_Price = ? WHERE Detail_ID = ?";
            const result = await conn.query(sql, [plcid, prdid, weight, totalprice, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getOrderDetails,
    // getBookById,
    addOrderDetail,
    deleteOrderDetailById,
    updateOrderDetailById,
};
