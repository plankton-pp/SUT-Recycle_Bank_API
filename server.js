const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const parserLimit = { limit: "10mb" }
require('dotenv').config();

const index = require("./routes/index");
const book = require("./routes/book");
const type = require("./routes/type");
const product = require("./routes/product");
const place = require("./routes/place");
const orderdetail = require("./routes/orderdetail");
const emailing = require("./routes/email");

app.use(cors());
app.use(bodyParser.json(parserLimit));
app.use(bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 10000,
}));

//ยังไม่รู้การทำงาน------------------------------------------------------------------------------------------
// app.use(async (req, res, next) => {
//     var allowedOrigins = ["http://localhost:4200", "http://localhost:4000"];
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

app.use("/", index);
app.use("/api/v1/book", book);
app.use("/api/v1/type", type);
app.use("/api/v1/product", product);
app.use("/api/v1/place", place);
app.use("/api/v1/orderdetail", orderdetail);
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