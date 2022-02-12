const conn = require('../config/dbConfig')

getFees = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM fee";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getLastId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM fee ORDER BY ID DESC LIMIT 1";
            const result = await conn.query(sql,);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addFee = (fee, createby) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const sql = "INSERT INTO `fee` (`ID`, `fee`, `Create_Date`, `Create_By`, `Update_Date`, `Update_By`) VALUES (NULL, ?, UNIX_TIMESTAMP(NOW()), ?, '', '');";            
            const result = await conn.query(sql, [fee, createby]);            
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteFeeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM fee WHERE ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateFeeById = (id,fee,updateby) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE `fee` SET `fee` = ?, `Update_Date` = UNIX_TIMESTAMP(NOW()), `Update_By` = ? WHERE `fee`.`ID` = ?;";
            const result = await conn.query(sql, [fee,updateby,id]);        
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
    getFees,
    // getBookById,
    addFee,
    deleteFeeById,
    updateFeeById,
    updateFee,
    getLastId
};
