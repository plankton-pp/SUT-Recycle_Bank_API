const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')
const sgTransport = require('nodemailer-sendgrid-transport');
sendMail = (sendTo, context) => {


    let options = {
        auth: {
            api_user: process.env.SMTP_USERNAME,
            api_key: process.env.SMTP_PASSWORD
        }

    }
    var client = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            api_user: process.env.SMTP_USERNAME,
            api_key: process.env.SMTP_PASSWORD
        }
    });

    // let client = nodemailer.createTransport(sgTransport(options));

    let email = {
        from: process.env.SMTP_EMAIL,
        to: 'planktonplnt@gmail.com',
        subject: 'Hello',
        text: 'Hello world',
        html: '<b>Hello world</b>'
    };

    client.sendMail(email, function (err, info) {
        if (err) {
            console.log(error);
        }
        else {
            console.log('Message sent: ' + info.response);
        }
    });

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
