const conn = require('../config/dbConfig')

getBooks = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM books";
            const result = await conn.query(sql, []);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

getBookById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "SELECT * FROM books WHERE id = ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

addBook = (name, author) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "INSERT INTO books (name, author) VALUES(?, ?)";
            const result = await conn.query(sql, [name, author]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "DELETE FROM books WHERE id =  ?";
            const result = await conn.query(sql, [id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

updateBookById = (name, author, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = "UPDATE books SET name = ?, author = ? WHERE id = ?";
            const result = await conn.query(sql, [name, author, id]);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getBooks,
    getBookById,
    addBook,
    deleteById,
    updateBookById,
};
