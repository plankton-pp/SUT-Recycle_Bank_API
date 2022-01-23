const conn = require('../config/dbConfig')

getType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM type";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addType = (name, empid ) => { 
    
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `type` (`Type_ID`, `Name`, `Update_Date`, `Create_Date`, `Update_By`, `Create_By`) VALUES (NULL, ?, current_timestamp(), current_timestamp(), '', ?);";
            const result = await conn.query(sql, [name, empid ]);
            resolve(result);
        } catch (e) { 
            reject(e);
        }
    });
};

deleteTypeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM type WHERE Type_ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateTypeById = (name, empid, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE type SET Name = ?, Update_By = ? WHERE Type_ID = ?";
            const result = await conn.query(sql, [name, empid, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getType,
    addType,
    deleteTypeById,
    updateTypeById
};