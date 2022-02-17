const express = require('express');
const router = express.Router();
const services = require('../services/fee.service')

//retrieve all data
router.get("/", async (req, res) => {
    try {
        const result = await services.getFees();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Fee table is empty";
        } else {
            message = "Successfully retrieved all Fees";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

router.get("/lastfee", async (req, res) => {
    try {
        const result = await services.getLastId();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Fee table is empty";
        } else {
            message = "Successfully retrieved Last Fees";
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
        let fee = req.body.fee;
        let createby = req.body.createby;
        fee = parseFloat(fee).toFixed(2);
        
        
        // console.log("result",req);
        const results = await services.addFee(fee, createby);
        
        //validation
        if (!fee || !createby) {
            return res.status(400).send({ error: true, message: 'Please provide fee\'s  fee createby.' })
        } else {
            return res.send({ error: false, data: results, message: 'Fee successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

//delete data by id
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deleteFeeById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide fee\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "fee not found";
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
        let id = req.body.id;
        let fee = req.body.fee;
        let updateby = req.body.updateby;
        fee = parseFloat(fee).toFixed(2);
        
        const results = await services.updateFeeById(id,fee,updateby);
        //validation
        if (!id|| !fee|| !updateby) {
            return res.status(400).send({ error: true, message: 'Please provide fee\'s id fee updateby.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Fee not found or data are same";
            } else {
                message = "Fee successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

//update Fee
router.put("/fee", async (req, res) => {
    try {
        //console.log(req);
        let fee = req.body.fee;  
        
        const results = await services.updateFee(fee);
        //validation
        if (!fee) {
            return res.status(400).send({ error: true, message: 'Please provide fee.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Product not found ";
            } else {
                message = "fee successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;



