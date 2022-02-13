const express = require('express');
const router = express.Router();
const services = require('../services/report2.service')


router.get("/:role", async (req, res) => {
    try {
        
        let role = req.params.role;  

        const result = await services.getMemberByRole(role);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Member not found";
        } else {
            message = "Successfully retrieved Member data";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

module.exports = router;



