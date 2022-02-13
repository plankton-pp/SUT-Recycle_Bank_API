const conn = require('../config/dbConfig')

getAllWallet = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM wallets";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getWalletByMemberId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM wallets WHERE Member_ID = ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addWallet = (Member_ID, Balance, Transactions_ID, Transactions_Place_ID, Transactions_Place_Members_ID, Transactions_Place_Employee_ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO wallets (Member_ID, Balance, Transactions_ID, Transactions_Place_ID, Transactions_Place_Members_ID, Transactions_Place_Employee_ID) VALUES(?, ?, ?, ?, ?, ?)";
            const result = await conn.query(sql, [Member_ID, Balance, Transactions_ID, Transactions_Place_ID, Transactions_Place_Members_ID, Transactions_Place_Employee_ID]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteWalletByMember_ID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM wallets WHERE Member_ID =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateWalletById = (Balance, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE wallets SET Balance = Balance + ? WHERE Member_ID = ?";
            const result = await conn.query(sql, [Balance, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getAllWallet,
    getWalletByMemberId,
    addWallet,
    deleteWalletByMember_ID,
    updateWalletById,
};
