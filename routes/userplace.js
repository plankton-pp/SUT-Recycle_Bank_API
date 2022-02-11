const express = require('express');
const router = express.Router();
const services = require('../services/userplace.service')

//retrieve all data
router.put("/", async (req, res) => {
    try {
        let memberid = req.body.memberid;

        const results = await services.getUserplace(memberid);
        
        //validation
        if (!memberid) {
            return res.status(400).send({ error: true, message: 'Please provide member id.' })
        } else {
            return res.send({ error: false, data: results, message: 'successfully retrive' })
        }
    } catch (e) {
        throw e;
    }
});

//retrieve all data
router.get("/placedetail", async (req, res) => {
    try {
        let memberid = req.body.memberid;      

        const results0 = await services.getUserplace(memberid);
        let results1 = [];
               
        for (let detail of results0){
            results1 = await services.getUserplacedetail(detail.Place_ID);
            detail.placedetail = results1
            // console.log("detail",detail);
        }
               
        //validation
        if (!memberid) {
            return res.status(400).send({ error: true, message: 'Please provide placeid.' })
        } else {
            // results0[0].placedetail=results1;
            // results0.placedetail = results1;
            
            return res.send({ error: false, data: results0, message: 'successfully retrive' })
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;