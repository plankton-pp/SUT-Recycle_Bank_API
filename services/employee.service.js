const conn = require('../config/dbConfig')

getEmployees = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT ID,Firstname, Lastname, Employee_ID, Username, Role, Phone, Email FROM employee";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getEmployeeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT ID,Firstname, Lastname, Employee_ID, Username, Role, Phone, Email FROM employee WHERE ID = ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

loginEmployee = (Username, Password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT ID,Firstname, Lastname, Employee_ID, Username, Role, Phone, Email FROM employee WHERE Username = ? and Password = MD5(?)";
            const result = await conn.query(sql, [Username, Password]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addEmployee = (Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO employee (Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email) VALUES(?, ?, ?, ?, MD5(?), ?, ?, ?)";
            const result = await conn.query(sql, [Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteEmployeeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM employee WHERE id =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateEmployeeById = (Firstname, Lastname, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE employee SET Firstname = ?, Lastname = ? WHERE ID = ?";
            const result = await conn.query(sql, [Firstname, Lastname, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getEmployees,
    getEmployeeById,
    loginEmployee,
    addEmployee,
    deleteEmployeeById,
    updateEmployeeById,
};