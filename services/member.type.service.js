const conn = require('../config/dbConfig')

getMemberType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM membertype";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addMemberType = (membertype, remark) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO membertype (MemberType, Remark) VALUES(?, ?)";
            const result = await conn.query(sql, [membertype, remark]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteMemberTypeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM membertype WHERE id =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateMemberTypeById = (id, membertype, remark) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE membertype SET MemberType = ?, Remark = ? WHERE ID = ?";
            const result = await conn.query(sql, [membertype, remark, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getMemberType,
    addMemberType,
    deleteMemberTypeById,
    updateMemberTypeById,
};