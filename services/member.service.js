const { use } = require('bcrypt/promises');
const conn = require('../config/dbConfig')

getMembers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT ID, Username, Firstname, Lastname, Role, Bank, Acc_number, Phone_number, Phone_number2, Email, Remark FROM members WHERE ID != 1";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getMemberById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT ID, Username, Firstname, Lastname, Role, Bank, Acc_number, Phone_number, Phone_number2, Email, Remark FROM members WHERE id = ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getMemberByUsername = (Member_User) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM members WHERE Username = ?";
            const result = await conn.query(sql, [Member_User]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

searchMember = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            var dynamicInput = '%'.concat(keyword.concat('%'));
            const sql = "SELECT ID, Username, Firstname, Lastname, Phone_number, Phone_number2, Email, Role FROM members WHERE ID like ? or Firstname like ? or Lastname like ? or Phone_number like ? or Phone_number2 like ? or Email like ?";
            const result = await conn.query(sql, [dynamicInput, dynamicInput, dynamicInput, dynamicInput, dynamicInput, dynamicInput]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addMember = (Username, Password, Firstname, Lastname, Role, Bank, Acc_number, Phone_number, Phone_number2, Email, Remark) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO members (Username, Password, Firstname, Lastname, Role, Bank, Acc_number, Phone_number, Phone_number2, Email, Remark) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const result = await conn.query(sql, [Username, Password, Firstname, Lastname, Role, Bank, Acc_number, Phone_number, Phone_number2, Email, Remark]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteMemberById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM members WHERE id =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateMemberById = (username, firstname, lastname, bankaccount, bank, phone1, phone2, email, role, remark, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `UPDATE members SET Username = ?,Firstname = ?,Lastname = ?, Acc_number = ?, Bank = ?, Phone_number = ?, Phone_number2 = ?, Email = ?, Role = ?, Remark = ? WHERE ID = ?`;
            const result = await conn.query(sql, [username, firstname, lastname, bankaccount, bank, phone1, phone2, email, role, remark, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

resetPassword = (email, phone, newpassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE members SET Password = ?  WHERE Email = ? and Phone_number = ?";
            const result = await conn.query(sql, [newpassword, email, phone]);
            const id = await conn.query("SELECT Employee_ID FROM employee WHERE Email = ? and Phone_number = ?", [email, phone]);
            resolve({ ...result, updatedId: id });
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getMembers,
    getMemberById,
    getMemberByUsername,
    searchMember,
    addMember,
    deleteMemberById,
    updateMemberById,
    resetPassword,
};
