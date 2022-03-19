const express = require('express');
const router = express.Router();
const services = require('../services/email.service')

router.post("/receipt", async (req, res) => {

    let sendTo = req.body.sendto
    let context = {
        subject: 'ใบเสร็จการนำฝากวัสดุ ธนาคารวัสดุรีไซเคิล มทส.',
        body: req.body.receipt
        // body: 'test send receipt'
    }
    try {
        const result = await services.sendMail(sendTo, context);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Sending email is err occured";
            return res.status(400).send({ error: true, data: result, message: message })
        } else {
            message = "Email has been send successfully !";
            return res.send({ error: false, data: result, message: message })
        }
    } catch (e) {
        throw e;
    }
});

router.post("/validate", async (req, res) => {

    let sendTo = req.body.sendto
    let context = {
        subject: 'Confirm validational code',
        body: req.body.validateCode
        // body: req.body.validateCode
    }
    try {
        const result = await services.sendMail(sendTo, context);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Sending email is err occured";
            return res.status(400).send({ error: true, data: result, message: message, code: req.body.validateCode, to: req.body.sendto })
        } else {
            message = "Email has been send successfully !";
            return res.send({ error: false, data: result, message: message, code: req.body.validateCode, to: req.body.sendto })
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;