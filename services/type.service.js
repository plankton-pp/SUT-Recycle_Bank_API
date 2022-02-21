const conn = require('../config/dbConfig')

getType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `
            SELECT
                T.Type_ID,
                T.Name,
                T.Update_Date,
                T.Create_Date,
                CONCAT(E.Firstname,' ',E.Lastname) AS Update_By,
                CONCAT(E1.Firstname,' ',E1.Lastname) AS Create_By
            FROM type T
            left JOIN employee E 
            ON T.Update_By = E.ID
            left JOIN employee E1
            ON T.Update_By = E1.ID;`;
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addType = (name,createby) => { 
    
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO `type` (`Type_ID`, `Name`, `Update_Date`, `Create_Date`, `Update_By`, `Create_By`) VALUES (NULL, ?, '', UNIX_TIMESTAMP(NOW()), '', ?);";
            const result = await conn.query(sql, [name,createby]);
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

updateTypeById = (name, updateby, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE type SET Name = ?, Update_By = ?, Update_Date = UNIX_TIMESTAMP(NOW()) WHERE Type_ID = ?";
            const result = await conn.query(sql, [name, updateby, id]);
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