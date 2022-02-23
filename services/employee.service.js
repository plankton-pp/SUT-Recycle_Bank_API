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

getEmployeeByEmpId = (empid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT ID,Firstname, Lastname, Employee_ID, Username, Role, Phone, Email FROM employee WHERE Employee_ID = ?";
            const result = await conn.query(sql, [empid]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getEmployeeByUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM employee WHERE Username = ?";
            const result = await conn.query(sql, [username]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

authEmployee = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM employee WHERE Email = ? or Username = ?";
            const result = await conn.query(sql, [String(keyword), String(keyword)]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getEmployeeByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `SELECT * FROM employee WHERE Email = "${email}"`;
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addEmployee = (Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO employee (Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
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

updateEmployeeById = (Firstname, Lastname, Username, Phone, Email, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE employee SET Firstname = ?, Lastname = ?, Username = ?, Phone = ?, Email = ? WHERE ID = ?";
            const result = await conn.query(sql, [Firstname, Lastname, Username, Phone, Email, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

resetPassword = (email, newpassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE employee SET Password = ?  WHERE Email = ?";
            const result = await conn.query(sql, [newpassword, email]);
            const id = await conn.query("SELECT Employee_ID FROM employee WHERE Email = ?", [email]);
            resolve({ ...result, updatedId: id });
        } catch (e) {
            reject(e);
        }
    });
};

addNewEmployee = (Empid, Email) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const sql = `INSERT INTO employee (Firstname, Lastname, Username, Password, Role, Phone, Employee_ID, Email) VALUES( "-","-","-","-","-","-",${Empid},${Email})`;
            const sql = `INSERT INTO employee (Firstname, Lastname, Username, Password, Role, Phone, Employee_ID, Email) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)`;
            const result = await conn.query(sql, ["-", "-", "-", "-", "-", "-", Empid, Email]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateNewEmployee = (Firstname, Lastname, Username, Password, Role, Phone, Employee_ID, Email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE employee SET Firstname = ?, Lastname = ?, Username = ?, Password = ?, Role = ?, Phone = ?WHERE Employee_ID = ? AND  Email = ? ";
            const result = await conn.query(sql, [Firstname, Lastname, Username, Password, Role, Phone, Employee_ID, Email]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getEmployees,
    getEmployeeById,
    getEmployeeByEmpId,
    getEmployeeByUsername,
    getEmployeeByEmail,
    authEmployee,
    addEmployee,
    deleteEmployeeById,
    updateEmployeeById,
    resetPassword,
    addNewEmployee,
    updateNewEmployee
};