const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const parserLimit = { limit: "10mb" }

//env config
require('dotenv').config();

//Route
const index = require("./routes/index");
const book = require("./routes/book");
const member = require("./routes/member");
const wallet = require("./routes/wallet");
const transaction = require("./routes/transaction");
const employee = require("./routes/employee");
const type = require("./routes/type");
const product = require("./routes/product");
const place = require("./routes/place");
const email = require("./routes/email");
const fee = require("./routes/fee");
const placedetail = require("./routes/placedetail");
const deposit = require("./routes/deposit");
const withdraw = require("./routes/withdraw");
const userplace = require("./routes/userplace");

//Route Report
const report1 = require("./routes/report1");
const report42 = require("./routes/report4-2");
const report52 = require("./routes/report5-2");
const report53 = require("./routes/report5-3");
const report54 = require("./routes/report5-4");

//Route Report
const report2 = require("./routes/report2");
const report43 = require("./routes/report4-3");
const report51 = require("./routes/report5-1");
const emailing = require("./routes/email");

const corsOptions = {
    origin: '*',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json(parserLimit));
app.use(bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 10000,
}));

app.use(
    session({
        key: 'userId',
        secret: 'subscribe',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 4,
        },
    })
)

// app.use(async (req, res, next) => {
//     var allowedOrigins = ["*"];
//     var origin = req.headers.origin;
//     res.header("Access-Control-Allow-Credentials", true);
//     if (allowedOrigins.indexOf(origin) > -1) {
//         res.setHeader("Access-Control-Allow-Origin", origin);
//     }
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTION");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Content-Type, Option, Authorization"
//     );
//     if ("OPTIONS" == req.method) {
//         res.sendStatus(200); //200 is OK
//     } else {
//         next();
//     }
// });


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use("/", index);
app.use("/api/v1/book", book);
app.use("/api/v1/member", member);
app.use("/api/v1/wallet", wallet);
app.use("/api/v1/transaction", transaction);
app.use("/api/v1/employee", employee);
app.use("/api/v1/type", type);
app.use("/api/v1/product", product);
app.use("/api/v1/place", place);
app.use("/api/v1/placedetail", placedetail);
app.use("/api/v1/deposit", deposit);
app.use("/api/v1/withdraw", withdraw);
app.use("/api/v1/email", email);
app.use("/api/v1/fee", fee);
app.use("/api/v1/userplace", userplace);
app.use("/api/v1/report2", report2);
app.use("/api/v1/report4-3", report43);
app.use("/api/v1/report5-1", report51);
app.use("/api/v1/report1", report1);
app.use("/api/v1/report5-2", report52);
app.use("/api/v1/report4-2", report42);
app.use("/api/v1/report5-3", report53);
app.use("/api/v1/report5-4", report54);


app.use("/employee", employee);


app.use("/api/v1/email", emailing);

if (process.env.NODE_ENV === 'test') {
    //listen port
    app.listen(process.env.PORT, () => {
        console.log('API Server');
        console.log('SERVER Status: Running');
        console.log('Running port: ' + process.env.PORT);
    })
}

module.exports = app;