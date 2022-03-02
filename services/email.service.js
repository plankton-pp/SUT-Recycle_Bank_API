const nodemailer = require("nodemailer");
sendMail = (sendTo, context) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        // port: PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: sendTo, // list of receivers
        subject: context.subject, // Subject line
        text: context.body, // plain text body
    }

    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
            console.log(err);
        } else {
            resolve(success);
            console.log('Email has been send successfully !', success);
        }
    })
}
sendReceipt = (sendTo, context) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        // port: PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: sendTo, // list of receivers
        subject: context.subject, // Subject line
        html: context.body, // plain text body
    }

    return new Promise(async (resolve, reject) => {
        try {
            transporter.sendMail(mailOptions, (err, success) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(success);
                    console.log('Email has been send successfully !', success);
                }
            })
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    sendMail,
    sendReceipt,
}
