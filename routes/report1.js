const express = require('express');
const router = express.Router();
const services = require('../services/report1.service')

router.get("/", async (req, res) => {
    try {
               
        const result = await services.getProductsAndPrice();
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



