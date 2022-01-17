const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

//homepage route
app.get('/', (req, res) => {
    return res.send({
        error: false,
        message: 'Welcome to RESTful CRUD API with NodeJS, Express and MySQL',
        written_by: 'Paxharpol',
        published_on: 'https://www.facebook.com/Ppchrpl.13'
    })
})
//connection to mysql database
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_api'
})
dbCon.connect();

//retrieve all data
app.get('/api/v1/books', (req, res) => {
    dbCon.query('SELECT * FROM books', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Books table is empty";
        } else {
            message = "Successfully retrieved all books";
        }
        return res.send({ error: false, data: results, message: message })
    })

})

//retrieve data by id
app.get('/api/v1/book/:id', (req, res) => {
    let id = req.params.id;

    //validation
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide book\'s id.' })
    } else {
        dbCon.query('SELECT * FROM books WHERE id =  ?', id, (error, results, fields) => {
            if (error) throw error;

            let message = ""
            if (results === undefined || results.length == 0) {
                message = "Book not found";
            } else {
                message = "Successfully retrieved book data";
            }
            return res.send({ error: false, data: results, message: message })
        })
    }
})

//create data
app.post('/api/v1/book', (req, res) => {
    let name = req.body.name;
    let author = req.body.author;

    //validation
    if (!name || !author) {
        return res.status(400).send({ error: true, message: 'Please provide book\'s name and author.' })
    } else {
        dbCon.query('INSERT INTO books (name, author) VALUES(?, ?)', [name, author], (error, results, fields) => {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Book successfully added' })
        })
    }
})

//update data
app.put('/api/v1/book', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;

    //validation
    if (!id || !name || !author) {
        return res.status(400).send({ error: true, message: 'Please provide book\'s id name and author.' })
    } else {
        dbCon.query('UPDATE books SET name = ?, author = ? WHERE id = ?', [name, author, id], (error, results, fields) => {
            if (error) throw error;

            let message = ""
            if (results.changedRows === 0) {
                message = "Book not found or data are same";
            } else {
                message = "Book successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        })
    }
})

//delete data by id
app.delete('/api/v1/book/:id', (req, res) => {
    let id = req.params.id;

    //validation
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide book\'s id.' })
    } else {
        dbCon.query('DELETE FROM books WHERE id =  ?', id, (error, results, fields) => {
            if (error) throw error;

            let message = ""
            if (results.affectedRows === 0) {
                message = "Book not found";
            } else {
                message = "Data successfully delete";
            }
            return res.send({ error: false, data: results, message: message })
        })
    }
})