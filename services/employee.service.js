const conn = require('../config/dbConfig')

getEmployees = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM employee";
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
            const sql = "SELECT * FROM employee WHERE ID = ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addEmployee = (Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO employee (ID,Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
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
            const sql = "UPDATE emoployee SET Firstname = ?, Lastname = ? WHERE ID = ?";
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
    addEmployee,
    deleteEmployeeById,
    updateEmployeeById,
};