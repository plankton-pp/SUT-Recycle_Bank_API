const express = require('express');
const router = express.Router();
const servicesPlace = require('../services/place.service')
const servicesPlaceDetail = require('../services/placedetail.service')
const servicesTransaction = require('../services/transaction.service')
const servicesWallet = require('../services/wallet.service')


const addProduct = async (placeid, memid, products) => {
    try {
        products.map(async (item) => {
            //validation
            if (!placeid || !memid || !item.typeid || !item.typename || !item.productid || !item.productname || !item.productprice || !item.unitdetail || !item.fee || !item.unit || !item.totalprice) {
                return res.status(400).send({ error: true, message: 'Please provide memid, placeid, item.typeid, item.typename, item.productid, item.productname, item.productprice, item.unitdetail, item.fee, item.unit, item.totalprice.' })
            } else {
                const results = await servicesPlaceDetail.addPlaceDetail(memid, placeid, item.typeid, item.typename, item.productid, item.productname, item.productprice, item.unitdetail, item.fee, item.unit, item.totalprice);
            }
        })
        return "Place's detail successfully added"
    } catch (error) {
        return "Cannot add place detail: " + error;
    }
}

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

const addWallet = async (netprice,transactionid, memid) => {
    if (String(transactionid).length > 0) {
        //validation
        if (!netprice || !transactionid || !memid) {
            return res.status(400).send({ error: true, message: 'Please provide memid, netprice,transactionid,placeid.' })
        } else {
            try {
                const results = await servicesWallet.updateWalletById(netprice,transactionid, memid);
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
        let placeby = req.body.placeby;
        let empid = req.body.empid;       
        let netprice = req.body.netprice;
        let status = "inProgress";
        let type = "deposit";
        //validation
        if (!memid || !placeby || !netprice || !status || !empid) {
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
                    message.wallet = await addWallet(netprice, transactionResponse[1], memid)

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