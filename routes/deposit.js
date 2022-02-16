const express = require('express');
const router = express.Router();
const servicesPlace = require('../services/place.service')
const servicesPlaceDetail = require('../services/placedetail.service')
const servicesTransaction = require('../services/transaction.service')
const servicesWallet = require('../services/wallet.service')


const addProduct = async (placeid, memid, products, fee) => {
    try {
        products.map(async (item) => {
            //validation
            if (!placeid || !memid || !item.typeid || !item.typename || !item.productid || !item.productname || !item.productprice || !item.unitdetail || !fee || !item.unit || !item.totalprice) {
                return { error: true, message: 'Please provide memid, placeid, item.typeid, item.typename, item.productid, item.productname, item.productprice, item.unitdetail, item.fee, item.unit, item.totalprice.' }
            } else {
                const results = await servicesPlaceDetail.addPlaceDetail(memid, placeid, item.typeid, item.typename, Number(item.productid), item.productname, item.productprice, item.unitdetail, fee, item.unit, item.totalprice);
            }
        })
        return "Place's detail successfully added"
    } catch (error) {
        return "Cannot add place detail: " + String(error);
    }
}

const addTransaction = async (placeid, memid, empid, type, price, lastFee) => {
    //validation
    if (!placeid || !memid || !empid || !type) {
        return { error: true, message: 'Please provide placeid, memid, empid, type,netprice.' }
    } else {
        try {
            const results = await servicesTransaction.addTransaction(placeid, memid, empid, type, Number(price) * (1 - lastFee));
            const resultsBank = await servicesTransaction.addTransaction(placeid, 1, empid, "sum", Number(price) * lastFee);
            return ['Transaction successfully added', results.insertId, resultsBank.insertId];
        } catch (error) {
            return ['Cannot add transaction: ', "-", "-"];
        }
    }

}

const addWallet = async (price, transactionid, memid) => {
    if (String(transactionid).length > 0) {
        //validation
        if (!price || !transactionid || !memid) {
            return { error: true, message: 'Please provide memid, netprice,transactionid,placeid.' }
        } else {
            try {
                const results = await servicesWallet.updateWalletById(price, transactionid, memid);
                return 'Wallet successfully update';
            } catch (error) {
                return 'Cannot update wallet: ' + String(error);
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
        let lastFee = Number(req.body.lastFee) / 100;
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
                    let placeid = resultsPlace.insertId;
                    let message = {
                        placeDetail: '',
                        transaction: '',
                        wallet: '',
                        walletBank: '',
                    }
                    //member
                    message.placeDetail = await addProduct(placeid, memid, products, req.body.lastFee)
                    transactionResponse = await addTransaction(placeid, memid, empid, type, netprice, lastFee)
                    message.transaction = transactionResponse[0]
                    message.wallet = await addWallet(Number(netprice) * (1 - lastFee), transactionResponse[1], memid)
                    message.walletBank = await addWallet(Number(netprice) * lastFee, transactionResponse[2], 1)
                    if (message.placeDetail.includes("Cannot") || message.transaction.includes("Cannot") || message.wallet.includes("Cannot")) {
                        return res.send({ error: true, message: message })
                    } else {
                        return res.send({ error: false, message: message })
                    }
                }
            } catch (e) {
                throw e;
            }
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;