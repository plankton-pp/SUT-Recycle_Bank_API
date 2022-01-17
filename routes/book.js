const express = require('express');
const router = express.Router();
const services = require('../services/book.service')

//retrieve all data
router.get("/", async (req, res) => {
    try {
        const result = await services.getBooks();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Books table is empty";
        } else {
            message = "Successfully retrieved all books";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

//retrieve data by id
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const result = await services.getBookById(id);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Book not found";
        } else {
            message = "Successfully retrieved book data";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

router.post("/", async (req, res) => {
    try {
        let name = req.body.name;
        let author = req.body.author;

        const results = await services.addBook(name, author);
        //validation
        if (!name || !author) {
            return res.status(400).send({ error: true, message: 'Please provide book\'s name and author.' })
        } else {
            return res.send({ error: false, data: results, message: 'Book successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

//delete data by id
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deleteById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide book\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "Book not found";
            } else {
                message = "Data successfully delete";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

//update data
router.put("/", async (req, res) => {
    try {
        let id = req.body.id;
        let name = req.body.name;
        let author = req.body.author;

        const results = await services.updateBookById(name, author, id);
        //validation
        if (!id || !name || !author) {
            return res.status(400).send({ error: true, message: 'Please provide book\'s id name and author.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Book not found or data are same";
            } else {
                message = "Book successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;



