const express = require('express');
const router = express.Router();
const services = require('../services/report5-1.service')

//retrieve Summary of deposits and withdrawals
router.get("/:year", async (req, res) => {
    try {

        let year = req.params.year; 

        const result = await services.getSumyearperformance(year);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Summary of year performance is empty";
        } else {
            message = "Successfully retrieved all Summary";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});


module.exports = router;



