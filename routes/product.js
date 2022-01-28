const express = require('express');
const router = express.Router();
const services = require('../services/product.service')

//retrieve all data
router.get("/", async (req, res) => {
    try {
        const result = await services.getProducts();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Product table is empty";
        } else {
            message = "Successfully retrieved all books";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

//retrieve data by id
// router.get("/:id", async (req, res) => {
//     try {
//         let id = req.params.id;
//         const result = await services.getBookById(id);
//         let message = ""
//         if (result === undefined || result.length == 0) {
//             message = "Book not found";
//         } else {
//             message = "Successfully retrieved book data";
//         }
//         return res.send({ error: false, data: result, message: message })
//     } catch (e) {
//         throw e;
//     }
// });

router.post("/", async (req, res) => {
    try {       
        //console.log(req);
        let typeid = req.body.typeid;
        let name = req.body.name;
        let price = req.body.price;        
        let createby = req.body.createby;

        const results = await services.addProduct(typeid, name, price, createby);
        //validation
        if (!typeid || !name || !price || !createby) {
            return res.status(400).send({ error: true, message: 'Please provide product\'s typeid name price and createby.' })
        } else {
            return res.send({ error: false, data: results, message: 'type successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

//delete data by id
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deleteProductById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide product\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "product not found";
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
        //console.log(req);
        let matid = req.body.matid;
        let typeid = req.body.typeid;
        let name = req.body.name;
        let price = req.body.price;        
        let updateby = req.body.updateby;

        const results = await services.updateProductById(matid, typeid, name, price, updateby);
        //validation
        if (!matid|| !typeid|| !name|| !price|| !updateby) {
            return res.status(400).send({ error: true, message: 'Please provide pruduct\'s matid typeid name price updateby.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Product not found or data are same";
            } else {
                message = "Product successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;



