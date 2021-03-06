const conn = require('../config/dbConfig')

getAllTransactions = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql =
                `SELECT 
                M.Firstname, 
                M.Lastname, 
                T.Detail, 
                T.Type, 
                T.Amount, 
                T.Create_Date as Create_Date, 
                CONCAT(E.Firstname,' ',E.Lastname) AS Create_By 
                FROM transactions T 
                JOIN members M ON M.id = T.Place_Members_ID 
                JOIN employee E ON E.ID = T.Place_Employee_ID 
                ORDER BY Create_Date DESC`;
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getTransactionByMember_ID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM transactions WHERE Place_Members_ID = ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addTransaction = (Place_ID, Place_Members_ID, Place_Employee_ID, Type, Amount) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO transactions (Place_ID, Place_Members_ID, Place_Employee_ID, Type, Amount, Create_Date, Detail) VALUES(?, ?, ?, ?, ?, UNIX_TIMESTAMP(NOW()),?)";
            const result = await conn.query(sql, [Place_ID, Place_Members_ID, Place_Employee_ID, Type, Amount, "deposit"]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addTransaction2 = (Place_Members_ID, Place_Employee_ID, Type, Amount) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO transactions (Place_ID, Place_Members_ID, Place_Employee_ID, Type, Amount, Create_Date, Detail) VALUES(?, ?, ?, ?, ?, UNIX_TIMESTAMP(NOW()), ?)";
            const result = await conn.query(sql, [0, Place_Members_ID, Place_Employee_ID, Type, Amount, "withdraw"]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteTransactionByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM transactions WHERE ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

// updateWalletById = (Balance, id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const sql = "UPDATE wallets SET Balance = ? WHERE Member_ID = ?";
//             const result = await conn.query(sql, [Balance, id]);
//             resolve(result);
//         } catch (e) {
//             reject(e);
//         }
//     });
// };

getWaitTransactions = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM transactions WHERE Type = 'waiting'";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllTransactions,
    getTransactionByMember_ID,
    addTransaction,
    addTransaction2,
    deleteTransactionByID,
    getWaitTransactions
};
