const express = require('express');
const router = express.Router();
const servicesPlace = require('../services/place.service')
const servicesOrderDetail = require('../services/orderdetail.service')

router.post("/", async (req, res) => {
    try {
        let memid = req.body.memid;
        let placeby = req.body.placeby;
        let status = req.body.status;
        let empid = req.body.empid;
        let datenow = Date.now();
        datenow = datenow.toString();
        datenow = datenow.substr(0, 9);

        const resultsPlace = await servicesPlace.addPlace(memid, placeby, status, empid);
        // const results2 = await services.getLastplace(memid,placeby,status,datenow,empid);
        //validation
        if (!memid || !placeby || !status || !empid) {
            return res.status(400).send({ error: true, message: 'Please provide Place\'s memid placeby status or empid.' })
        } else {
            //Global variable (this scope)
            let allResults = { error: false, dataPlace: resultsPlace, message: 'Place successfully added' }
            let placeid = resultsPlace.insertId;

            //Try to call other API
            try {
                let products = Array.from(req.body.product);
                if (products && products.length > 0) {
                    products.forEach(async (item, index) => {
                        const results = await servicesOrderDetail.addOrderDetail(placeid, item.productid, item.weight, item.totalprice);
                        //validation
                        if (!placeid || !item.productid || !item.weight || !item.totalprice) {
                            return res.status(400).send({ error: true, message: 'Please provide placeid productid weight and totalprice.' })
                        } else {
                            allResults[`dataOrder-${index + 1}`] = { order: `dataOrder-${index + 1}`, error: false, data: results, message: 'orderdetail successfully added' }
                            console.log(allResults[`dataOrder-${index + 1}`]);
                        }
                    })

                //For other API
                    // products.forEach(async (item, index) => {
                    //     const results = await servicesOrderDetail.addOrderDetail(placeid, item.productid, item.weight, item.totalprice);
                    //     //validation
                    //     if (!placeid || !item.productid || !item.weight || !item.totalprice) {
                    //         return res.status(400).send({ error: true, message: 'Please provide placeid productid weight and totalprice.' })
                    //     } else {
                    //         allResults[`dataOrder-${index + 1}`] = { order: `dataOrder-${index + 1}`, error: false, data: results, message: 'orderdetail successfully added' }
                    //         console.log(allResults[`dataOrder-${index + 1}`]);
                    //     }
                    // })
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