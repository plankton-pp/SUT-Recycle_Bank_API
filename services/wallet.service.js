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
                    DATE_FORMAT(DATE_ADD(date_format(FROM_UNIXTIME(T.Create_Date),'%Y-%m-%d'), INTERVAL 543 YEAR),'%Y-%m-%d') as Create_Date,
                    W.Balance
                FROM wallets W
                JOIN members M
                ON M.ID = W.Member_ID
                JOIN transactions T
                ON T.ID = W.Transactions_ID
                WHERE W.Balance > 0
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
            const sql = "UPDATE wallets SET Balance = Balance - ?, Transactions_ID = 0 WHERE Member_ID = ?";
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
