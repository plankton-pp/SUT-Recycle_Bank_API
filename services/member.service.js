const conn = require('../config/dbConfig')

getMembers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM members";
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
            const sql = "SELECT * FROM members WHERE id = ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addMember = (Member_User, Member_Password, Firstname, Lastname, Role, No_members, Bank, Acc_number, Phone_number, Remark) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO members (Member_User, Member_Password, Firstname, Lastname, Role, No_members, Bank, Acc_number, Phone_number, Remark) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const result = await conn.query(sql, [Member_User, Member_Password, Firstname, Lastname, Role, No_members, Bank, Acc_number, Phone_number, Remark]);
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

updateMemberById = (Firstname, Lastname, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE members SET Firstname = ?, Lastname = ? WHERE ID = ?";
            const result = await conn.query(sql, [Firstname, Lastname, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getMembers,
    getMemberById,
    addMember,
    deleteMemberById,
    updateMemberById,
};
