const express = require('express');
const router = express.Router();

const servicesTransaction = require('../services/transaction.service')
const servicesWallet = require('../services/wallet.service')




const addTransaction = async (placeid, memid, empid, type, netprice) => {
    console.log(placeid, memid, empid, type, netprice);
    //validation
    if (!placeid || !memid || !empid || !type) {
        return res.status(400).send({ error: true, message: 'Please provide placeid, memid, empid, type,netprice.' })
    } else {
        try {
            const results = await servicesTransaction.addTransaction(placeid, memid, empid, type, netprice);
            return ['Transaction successfully added', results.insertId];
        } catch (error) {
            return 'Cannot add transaction: ' + error;
        }
    }

}

const withdrawWallet = async (transactionid, memid, netprice, placeid) => {
    if (String(transactionid).length > 0) {
        //validation
        if (!netprice || !transactionid || !placeid || !memid) {
            return res.status(400).send({ error: true, message: 'Please provide memid, netprice,transactionid,placeid.' })
        } else {
            try {
                const results = await servicesWallet.updateWalletByIdWithdraw(memid, netprice, transactionid, placeid);
                return 'Wallet successfully update';
            } catch (error) {
                return 'Cannot update wallet: ' + error;
            }
        }
    }
}

router.post("/", async (req, res) => {
    try {
        let memid = req.body.memid;
        let empid = req.body.empid;       
        let netprice = req.body.netprice;
        let status = "Success";
        let type = "withdraw";
        //validation
        if (!memid  || !netprice || !status || !empid) {
            return res.status(400).send({ error: true, message: 'Please provide memid, placeby, netprice ,status, empid.' })
        } else {

            const resultsPlace = await servicesPlace.addPlace(memid, placeby, netprice, status, empid);
            // //Try to call other API
            try {
                let products = Array.from(req.body.product);
                if (products && products.length > 0) {
                    let allResults = {};
                    let placeid = resultsPlace.insertId;
                    let message = {
                        placeDetail: '',
                        transaction: '',
                        wallet: '',
                    }

                    message.placeDetail = await addProduct(placeid, memid, products)
                    transactionResponse = await addTransaction(placeid, memid, empid, type, netprice)
                    message.transaction = transactionResponse[0]
                    message.wallet = await addWallet(transactionResponse[1], memid, netprice, placeid)

                    if (message.placeDetail.includes("Cannot") || message.transaction.includes("Cannot") || message.wallet.includes("Cannot")) {
                        return res.send({ error: true, message: message })
                    } else {
                        return res.send({ error: false, message: message })
                    }
                }
            } catch (e) {
                throw e;
            }

            //Finally
            // console.log(allResults);
            // return res.send(allResults)
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;