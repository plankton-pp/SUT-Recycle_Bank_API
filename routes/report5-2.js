const express = require('express');
const router = express.Router();
const services = require('../services/report5-2.service')

router.get("/", async (req, res) => {
    try {
        let year = req.body.year;  

        const result = await services.getIncomedetail(year);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Table not found";
        } else {
            message = "Successfully retrieved data";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

module.exports = router;



