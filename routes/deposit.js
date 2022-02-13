const express = require('express');
const router = express.Router();
const servicesPlace = require('../services/place.service')
const servicesPlaceDetail = require('../services/placedetail.service')
const servicesTransaction = require('../services/transaction.service')
const servicesWallet = require('../services/wallet.service')

router.post("/", async (req, res) => {
    try {
        let memid = req.body.memid;
        let placeby = req.body.placeby;        
        let empid = req.body.empid;
        let detail = req.body.detail;
        let netprice = req.body.netprice;  
        let status = "unpaid";      
        let type = "deposit";

        //validation
        if (!memid || !placeby || !netprice || !status || !empid) {
            return res.status(400).send({ error: true, message: 'Please provide memid, placeby, netprice ,status, empid.' })
        } else {
            const resultsPlace = await servicesPlace.addPlace(memid, placeby, netprice ,status, empid);
            //Global variable (this scope)
            let allResults;
            let placeid = resultsPlace.insertId;
            let message1;
            let message2;
            let message3;

            //Try to call other API
            try {
                let products = Array.from(req.body.product);
                if (products && products.length > 0) {
                    products.forEach(async (item, index) => {                        
                        //validation
                        if (!placeid || !memid|| !item.typeid || !item.typename || !item.productid || !item.productname || !item.productprice || !item.unitdetail || !item.fee || !item.unit || !item.totalprice) {
                            return res.status(400).send({ error: true, message: 'Please provide memid, placeid, item.typeid, item.typename, item.productid, item.productname, item.productprice, item.unitdetail, item.fee, item.unit, item.totalprice.' })
                        } else {
                            const results = await servicesPlaceDetail.addPlaceDetail(memid, placeid, item.typeid, item.typename, item.productid, item.productname, item.productprice, item.unitdetail, item.fee, item.unit, item.totalprice);
                            message1 = 'placedetail successfully added';
                            // console.log("message1",message1);
                        }
                    })            
 
                    //validation
                    if (!placeid || !memid || !empid || !type || !detail) {
                        return res.status(400).send({ error: true, message: 'Please provide placeid, memid, empid, type,netprice, detail.' })
                    } else {
                        const results2 = await servicesTransaction.addTransaction(placeid, memid, empid, type,netprice, detail);
                        message2 =  'Transaction successfully added';
                        let transactionid = results2.insertId; 

                        if(String(transactionid).length > 0){
                            //validation
                            if (!netprice || !transactionid || !placeid || !memid) {
                                return res.status(400).send({ error: true, message: 'Please provide memid, netprice,transactionid,placeid.' })
                            } else {
                                const results3 = await servicesWallet.updateWalletById(memid, netprice,transactionid,placeid);
                                message3 = 'Wallet successfully update';            
                                allResults = { error: false, message1: message1,message2: message2,message3: message3}
                            }
                        }  
                    }                     
  
                    }
            } catch (e) {
                throw e;
            }

            //Finally
            console.log(allResults);
            return res.send(allResults)
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;