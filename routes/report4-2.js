const express = require('express');
const router = express.Router();
const services = require('../services/report4-2.service')

//retrieve all data
router.get("/", async (req, res) => {
    try {
        // let memberid = req.body.memberid;
        // let placeid = req.body.placeid;

        const result0 = await services.getUser();
        let results1 = [];
               
        for (let detail of result0){
            results1 = await services.getUserplacedetail(detail.ID);
            detail.placedetail = results1
            // console.log("detail",detail);
        }
               
        //validation
        let message = ""
        if (result0.length == 0) {
            message = "Data not found";
        } else {
            message = "Successfully retrieved data";
        }

        return res.send({ error: false, data: result0, message: message })
    } catch (e) {
        throw e;
    }
});

module.exports = router;