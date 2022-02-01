const express = require('express');
const router = express.Router();
const services = require('../services/member.service')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;

//retrieve all data
router.get("/", async (req, res) => {
    try {
        const result = await services.getMembers();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Members table is empty";
        } else {
            message = "Successfully retrieved all Members";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

//retrieve data by id
router.get("/:ID", async (req, res) => {
    try {
        let id = req.params.ID;
        const result = await services.getMemberById(id);
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

const verifyJWT = (req, res, next) => {
    const tokenAccess = req.headers["x-access-token"];
    if (typeof tokenAccess !== 'undefined') {
        const bearerToken = String(tokenAccess).split(' ');
        const token = bearerToken[1];
        jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
            if (err) {
                res.send({ error: true, auth: false, message: "failed to authenticated" })
            } else {
                req.userId = decoded.id
                next();
            }
        })
    } else {
        res.send({ error: true, auth: false, message: "need token to verify" })
    }
}

router.get('/auth/isUserAuth', verifyJWT, (req, res) => {
    res.send({ error: false, auth: true, userId: req.userId, message: "user authenticated" })
})

router.post("/auth", async (req, res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;

        const result = await services.loginMember(username);
        let message = ""
        if (result === undefined || result.length === 0) {
            message = "No user exist";
            return res.send({ error: true, data: result, message: message })
        } else {
            // console.log(result[0].Password);
            bcrypt.compare(password, result[0].Password, (err, response) => {
                if (password) {
                    message = "Logged in";
                    const id = result[0].ID;
                    const token = jwt.sign({ id }, process.env.JWTSECRET, {
                        expiresIn: '3h',
                    })
                    req.session.user = result;
                    console.log(password, result[0].Password);
                    return res.send({ error: false, auth: true, token: token, data: result, message: message })
                } else {
                    message = "Wrong username/password combination";
                    return res.send({ error: true, message: message })
                }
            })
        }
    } catch (e) {
        throw e;
    }
});

router.post("/register", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const empId = req.body.empId;
    const role = req.body.role;
    const phone = req.body.phone;
    const email = req.body.email;
    const bank = req.body.bank;
    const accnumber = req.body.accnumber;
    const phone2 = req.body.phone2;
    const remark = req.body.remark;

    try {
        bcrypt.hash(password, saltRound, async (err, hash) => {
            if (err) {
                console.log(err);
            }
            //validation
            if (!username || !password || !firstname || !lastname || !role || !bank || !accnumber || !phone) {
                return res.status(400).send({ error: true, message: 'Please provide Member\'s data.' })
            } else {
                const results = await services.addMember(username, hash, firstname, lastname, role, bank, accnumber, phone, phone2, email, remark);
                return res.send({ error: false, data: results, message: 'Member successfully added' })
            }

        })
    } catch (e) {
        throw e;
    }
});

router.get("/key/:KEY", async (req, res) => {
    try {

        let keyword = req.params.KEY;

        const result = await services.searchMember(keyword);
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


//delete data by id
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deleteMemberById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide member\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "Member not found";
            } else {
                message = "Data successfully delete";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

//update data
router.put("/", async (req, res) => {
    try {
        let id = req.body.id;
        let Firstname = req.body.firstname;
        let Lastname = req.body.lastname;

        const results = await services.updateMemberById(Firstname, Lastname, id);
        //validation
        if (!id || !Firstname || !Lastname) {
            return res.status(400).send({ error: true, message: 'Please provide Member\'s id firstname and lastname.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Member not found or data are same";
            } else {
                message = "Member successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;



