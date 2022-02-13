const express = require('express');
const router = express.Router();
const services = require('../services/report5-4.service')

router.get("/:year", async (req, res) => {
    try {
        let year = req.params.year;  

        const result = await services.getProductdetail(year);
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



