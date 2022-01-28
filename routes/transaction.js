const express = require('express');
const router = express.Router();
const services = require('../services/transaction.service')

//retrieve all data
router.get("/", async (req, res) => {
    try {
        const result = await services.getAllTransactions();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Transactions table is empty";
        } else {
            message = "Successfully retrieved all Transactions";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

//retrieve data by id
router.get("/:ID", async (req, res) => {
    try {
        let id = req.params.ID;
        const result = await services.getTransactionByPlace_Member_ID(id);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Transaction not found";
        } else {
            message = "Successfully retrieved Transaction data";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

router.post("/", async (req, res) => {
    try {
        
        let Place_ID = req.body.Place_ID; 
        let Place_Member_ID = req.body.Place_Member_ID; 
        let Place_Employee_ID = req.body.Place_Employee_ID; 

        const results = await services.addTransaction(Place_ID, Place_Member_ID, Place_Employee_ID);
        //validation
        if (!Place_ID || !Place_Member_ID || !Place_Employee_ID) {
            return res.status(400).send({ error: true, message: 'Please provide Transaction\'s data.' })
        } else {
            return res.send({ error: false, data: results, message: 'Transaction successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

// //delete data by Member_ID
// router.delete("/:id", async (req, res) => {
//     try {
//         let Member_ID = req.params.Member_ID;

//         const results = await services.deleteWalletByMember_ID(Member_ID);
//         //validation
//         if (!Member_ID) {
//             return res.status(400).send({ error: true, message: 'Please provide member\'s id.' })
//         } else {
//             let message = ""
//             if (results.affectedRows === 0) {
//                 message = "Wallet not found";
//             } else {
//                 message = "Data successfully delete";
//             }
//             return res.send({ error: false, data: results, message: message })
//         }
//     } catch (e) {
//         throw e;
//     }
// });

// //update data
// router.put("/", async (req, res) => {
//     try {
//         let Member_ID = req.body.Member_ID;
//         let Balance = req.body.Balance;

//         const results = await services.updateWalletById(Balance, Member_ID);
//         //validation
//         if (!Balance || !Member_ID) {
//             return res.status(400).send({ error: true, message: 'Please provide Member\'s id and Balance.' })
//         } else {
//             let message = ""
//             if (results.changedRows === 0) {
//                 message = "Wallet not found or data are same";
//             } else {
//                 message = "Wallet successfully updated";
//             }
//             return res.send({ error: false, data: results, message: message })
//         }
//     } catch (e) {
//         throw e;
//     }
// });


module.exports = router;



