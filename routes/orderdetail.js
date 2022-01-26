const express = require('express');
const router = express.Router();
const services = require('../services/orderdetail.service')

//retrieve all data
router.get("/orderdetails", async (req, res) => {
    try {
        const result = await services.getOrderDetails();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Order Details table is empty";
        } else {
            message = "Successfully retrieved all Order Details";
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

router.post("/addorderdetail", async (req, res) => {
    try {
        
        let plcid = req.body.plcid;
        let prdid = req.body.prdid;
        let weight = req.body.weight;
        let totalprice = req.body.totalprice;

        const results = await services.addOrderDetail(plcid, prdid, weight, totalprice);
        //validation
        if (!plcid || !prdid || !weight || !totalprice) {
            return res.status(400).send({ error: true, message: 'Please provide plcid prdid weight and totalprice.' })
        } else {
            return res.send({ error: false, data: results, message: 'orderdetail successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

//delete data by id
router.delete("/orderdetailbyid/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deleteOrderDetailById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide orderdetail\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "Order Detail not found";
            } else {
                message = "Data successfully delete";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

// //update data
router.put("/updateorderdetail", async (req, res) => {
    try {
        let id = req.body.id;
        let plcid = req.body.plcid;
        let prdid = req.body.prdid;
        let weight = req.body.weight;
        let totalprice = req.body.totalprice;
       

        const results = await services.updateOrderDetailById(plcid, prdid, weight, totalprice, id);
        //validation
        if (!plcid || !prdid || ! weight || ! totalprice || ! id) {
            return res.status(400).send({ error: true, message: 'Please provide Order Detail plcid prdid weight totalprice or id.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Order Detail not found or data are same";
            } else {
                message = "Order Detail successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;



