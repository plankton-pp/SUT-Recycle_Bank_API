const conn = require('../config/dbConfig')

getAllTransactions = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM transactions";
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

addTransaction = (Place_ID, Place_Members_ID, Place_Employee_ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO transactions (Place_ID, Place_Members_ID, Place_Employee_ID) VALUES(?, ?, ?)";
            const result = await conn.query(sql, [Place_ID, Place_Members_ID, Place_Employee_ID]);
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


module.exports = {
    getAllTransactions,
    getTransactionByMember_ID,
    addTransaction,
    deleteTransactionByID,
};
