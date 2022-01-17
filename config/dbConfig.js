const mysql = require("mysql");

const con = mysql.createPool({
  connectionLimit: 1000,
  //1 hr
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs_api",
});

query = (sql, values) => {
  return new Promise((resolve, reject) => {
    con.getConnection(function(err, connection) {
      connection.query(sql, values, (err, result) => {
        if (err) {
          reject("Error Query : " + err);
        }
        connection.release();
        if (result) {
          resolve(result);
        } else {
          resolve("");
        }
      });
    });
  });
};

module.exports = {
  query,
};
