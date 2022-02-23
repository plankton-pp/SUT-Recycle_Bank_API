const nodemailer = require("nodemailer");
const sendgrid = require('@sendgrid/mail');
// const sgTransport = require('nodemailer-sendgrid-transport');
sendMail = (sendTo, context) => {

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: 'planktonplnt@gmail.com',
        // Change to your recipient
        from: 'test@example.com',
        // Change to your verified sender
        subject: 'Sending with SendGrid Is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sendgrid.send(msg).then((resp) => {
        console.log('Email sent\n', resp)
    }).catch((error) => {
        console.error(error)
    })


    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     // port: PORT,
    //     // secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD,
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    // // send mail with defined transport object
    // let mailOptions = {
    //     from: process.env.EMAIL_USERNAME, // sender address
    //     to: sendTo, // list of receivers
    //     subject: context.subject, // Subject line
    //     text: context.body, // plain text body
    // }

    // transporter.sendMail(mailOptions, (err, success) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         resolve(success);
    //         console.log('Email has been send successfully !', success);
    //     }
    // })
}
sendReceipt = (sendTo, context) => {
    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     // port: PORT,
    //     // secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD,
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    // // send mail with defined transport object
    // let mailOptions = {
    //     from: process.env.EMAIL_USERNAME, // sender address
    //     to: sendTo, // list of receivers
    //     subject: context.subject, // Subject line
    //     html: context.body, // plain text body
    // }

    // console.log(mailOptions);

    // return new Promise(async (resolve, reject) => {
    //     try {
    //         transporter.sendMail(mailOptions, (err, success) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 resolve(success);
    //                 console.log('Email has been send successfully !', success);
    //             }
    //         })
    //     } catch (e) {
    //         reject(e);
    //     }
    // });
}

module.exports = {
    sendMail,
    sendReceipt,
}
