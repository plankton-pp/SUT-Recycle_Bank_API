var express = require("express");
var router = express.Router();

//homepage route
router.get("/", (req, res) => {
  return res.send({
    error: false,
    message: "Welcome to RESTful CRUD API with NodeJS, Express and MySQL",
    written_by: "Paxharpol",
    published_on: "http://localhost:3015/#/dld-sut-recycle-bank/login",
  });
});

module.exports = router;