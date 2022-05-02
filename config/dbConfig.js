const mysql = require("mysql");

const con = mysql.createPool({
  connectionLimit: 1000,
  //1 hr
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  //host
  host: process.env.NODE_ENV==="test"?process.env.DB_ADDRESS_DEV:process.env.DB_ADDRESS,
  user: process.env.NODE_ENV==="test"?process.env.DB_USER_DEV:process.env.DB_USER,
  password: process.env.NODE_ENV==="test"?process.env.DB_ACCESS_DEV:process.env.DB_ACCESS,
  port:3306,
  database: "nodejs_api",
});

query = (sql, values) => {
  return new Promise((resolve, reject) => {
    con.getConnection(function (err, connection) {
      connection.query(sql, values, (err, result) => {
        if (err) {
          reject("Error Query : " + err);
        }
        connection.release();
        if (result) {
          resolve(result);
        } else {
          resolve("connection failed by manual");
        }
      });
    });
  });
};

module.exports = {
  query,
};
