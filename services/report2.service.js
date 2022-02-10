const conn = require('../config/dbConfig')



getMemberByRole = (role) => {
    return new Promise(async (resolve, reject) => {
        if(role != ""){
            try {
                const sql = "SELECT ID, Firstname, Lastname, Role, Bank, Acc_number, Phone_number, Phone_number2, Email, Remark FROM members WHERE Role like ?";
                const result = await conn.query(sql, [role]);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }else{
            try {
                const sql = "SELECT ID, Firstname, Lastname, Role, Bank, Acc_number, Phone_number, Phone_number2, Email, Remark FROM members";
                const result = await conn.query(sql);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }
    });
};



module.exports = {
    getMemberByRole,
    
};
