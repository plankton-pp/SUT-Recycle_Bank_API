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

getWalletWithBalance = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = 
                `SELECT 
                    M.ID,
                    M.Firstname,
                    M.Lastname,
                    M.Bank,
                    M.Acc_number,
                    T.Create_Date as Create_Date,
                    W.Balance
                FROM wallets W
                JOIN members M
                ON M.ID = W.Member_ID
                JOIN transactions T
                ON T.ID = W.Transactions_ID
                WHERE W.Balance > 0
                and M.ID != 1
                `;
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

addWallet = (Member_ID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO wallets (Member_ID, Balance, Transactions_ID, Transactions_Place_ID) VALUES(?, 0, 0, 0)";
            const result = await conn.query(sql, [Member_ID]);
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

updateWalletById = (Balance, Transactions_ID, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE wallets SET Balance = Balance + ?, Transactions_ID = ? WHERE Member_ID = ?";
            const result = await conn.query(sql, [Balance, Transactions_ID, id,]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateWalletByIdWithdraw = (Balance, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE wallets SET Balance = Balance - CONVERT(?, float), Transactions_ID = 0 WHERE Member_ID = ?";
            const result = await conn.query(sql, [Balance, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getAllWallet,
    getWalletWithBalance,
    getWalletByMemberId,
    addWallet,
    deleteWalletByMember_ID,
    updateWalletById,
    updateWalletByIdWithdraw,
};
