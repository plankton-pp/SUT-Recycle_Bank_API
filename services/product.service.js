const conn = require('../config/dbConfig')

getProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM product";
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

addProduct = (typeid, name, detail, price, unitdetail, fee, createby) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `product` (`Product_ID`, `Type_ID`, `Name`, `Detail`,`Price_per_unit`, `Unit_Detail`,`Operation_Fee`, `Update_Date`, `Update_By`, `Create_Date`, `Create_By`) VALUES (NULL, ?, ?, ?, ?, ?, ?, '', '', UNIX_TIMESTAMP(NOW()), ?);";
            // console.log("SQL",sql);
            // console.log("typeid, name, detail, price, createby",typeid, name, detail, price, createby);
            const result = await conn.query(sql, [typeid, name, detail, price, unitdetail, fee, createby]);
            
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM product WHERE Product_ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateProductById = (typeid, name, detail, price, unitdetail, updateby, productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE Product SET Type_ID = ?, Name = ?, Detail = ?, Price_per_unit = ?, Unit_Detail = ?, Update_By = ?, Update_Date = UNIX_TIMESTAMP(NOW()) WHERE Product_ID = ?";
            const result = await conn.query(sql, [typeid, name, detail, price, unitdetail, updateby, productid]);        
            // console.log("typeid, name, detail, price, createby",typeid, name, detail, price, createby);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateFee = (Fee) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE Product SET Operation_Fee = ?";
            const result = await conn.query(sql, [Fee]);    
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getProducts,
    // getBookById,
    addProduct,
    deleteProductById,
    updateProductById,
    updateFee
};
