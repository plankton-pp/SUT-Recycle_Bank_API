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
        let status = req.body.status;
        let empid = req.body.empid;
        let detail = req.body.detail;
        let netprice = req.body.netprice;        
        let type = "deposit";
      

        const resultsPlace = await servicesPlace.addPlace(memid, placeby, netprice ,status, empid);
        
        //validation
        if (!memid || !placeby || !netprice || !status || !empid) {
            return res.status(400).send({ error: true, message: 'Please provide Place\'s all data.' })
        } else {
            //Global variable (this scope)            
            let placeid = resultsPlace.insertId;
            let allResults;
            //Try to call other API
            try {
                let products = Array.from(req.body.product);
                if (products && products.length > 0) {
                    products.forEach(async (item, index) => {
                        const results = await servicesPlaceDetail.addPlaceDetail(memid, placeid, item.typeid, item.typename, item.productid, item.productname, item.productprice, item.unitdetail, item.fee, item.unit, item.totalprice);
                        //validation
                        if (!placeid || !memid|| !item.typeid || !item.typename || !item.productid || !item.productname || !item.productprice || !item.unitdetail || !item.fee || !item.unit || !item.totalprice) {
                            return res.status(400).send({ error: true, message: 'Please provide all data.' })
                        } else {                         
                            if(results.length >=0){
                                const results2 = await servicesTransaction.addTransaction(placeid, memid, empid, type, detail);
                                if (!placeid || !memid || !empid || !type) {
                                    return res.status(400).send({ error: true, message: 'Please provide placeid memid empid detail and type.' })
                                } else {        
                                    let transactionid = results2.insertId;          
                                    if(String(transactionid).length > 0){
                                        const results3 = await servicesWallet.updateWalletById(netprice,memid);
                                        // updateWalletById(memid, netprice,transactionid,placeid)
                                        //validation
                                        if (!netprice || !memid) {
                                            // !netprice || !transactionid || !placeid || !memid
                                            return res.status(400).send({ error: true, message: 'Please provide netprice.' })
                                        } else {                                           
                                            allResults = { error: false, data: results, data2: results2, data3: results3, message: 'Deposit successfully added' }
                                        }
                                    }   
                                }
                                

                            }
                        }
                    })       
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