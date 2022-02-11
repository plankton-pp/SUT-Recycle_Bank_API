const express = require('express');
const router = express.Router();
const services = require('../services/email.service')

router.post("/validate", async (req, res) => {

    let sendTo = req.body.sendto
    let context = {
        subject: 'Confirm validational code',
        body: req.body.validateCode
    } 
    try {
        const result = await services.sendMail(sendTo,context);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Sending email is err occured";
        } else {
            message = "Email has been send successfully !";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

module.exports = router;