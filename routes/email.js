const express = require('express');
const router = express.Router();
const services = require('../services/email.service')

router.get("/", async (req, res) => {
    let sendTo = 'b6123338@g.sut.ac.th'
    let context = {
        subject: 'Test send mail',
        body: 'Hello Peter'
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