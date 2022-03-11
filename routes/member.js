const express = require('express');
const router = express.Router();
const services = require('../services/member.service')
const servicesWallet = require('../services/wallet.service')
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

router.post("/checkDuplicate", async (req, res) => {
    const username = req.body.username
    try {
        const results = await services.getMemberByUsername(username);
        if (results === undefined || results.length == 0) {
            return res.send({ error: false, data: results, message: "no user duplicate", duplicate: false })
        } else {
            return res.send({ error: true, data: results, message: "duplicate username", duplicate: true })
        }
    } catch (e) {
        throw e;
    }
})


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

        const result = await services.getMemberByUsername(username);
        let message = ""
        if (result === undefined || result.length === 0) {
            message = "No user exist";
            return res.send({ error: true, data: result, message: message })
        } else {
            // console.log(result[0].Password);
            bcrypt.compare(password, result[0].Password, (err, response) => {
                if (response) {
                    message = "Logged in";
                    const id = result[0].ID;
                    const token = jwt.sign({ id }, process.env.JWTSECRET, {
                        expiresIn: '3h',
                    })
                    req.session.user = result;
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
    const role = req.body.role;
    let phone1 = String(req.body.phone1).replace(/[^\w\s]/gi, '');
    phone1 = String(phone1).length > 1 ? phone1.slice(0, 3) + "-" + phone1.slice(3, 6) + "-" + phone1.slice(6) : '-';
    let phone2 = String(req.body.phone2).replace(/[^\w\s]/gi, '');
    phone2 = String(phone2).length > 1 ? phone2.slice(0, 3) + "-" + phone2.slice(3, 6) + "-" + phone2.slice(6) : '-';

    const email = req.body.email;
    const bank = req.body.bank;
    let accnumber = String(req.body.accnumber).replace(/[^\w\s]/gi, '');
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
                let memid = results.insertId;
                const result2 = await servicesWallet.addWallet(memid);
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

router.put("/resetPassword", async (req, res) => {
    try {
        let email = req.body.email;
        let phone = String(req.body.phone).replace(/[^\w\s]/gi, '');
        phone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
        let newpassword = req.body.newpassword;

        bcrypt.hash(newpassword, saltRound, async (err, hash) => {
            //validation
            if (!email || !phone || !newpassword) {
                return res.status(400).send({ error: true, message: 'Please provide Member\'s email and new password to reset.' })
            } else {
                const results = await services.resetPassword(email, phone, hash);
                let message = ""
                if (results.changedRows === 0) {
                    message = "Member not found";
                } else {
                    message = "Password successfully updated";
                }
                return res.send({ error: false, data: results, message: message })
            }

        })
    } catch (e) {
        throw e;
    }
});

router.put("/", async (req, res) => {
    try {
        let id = req.body.id;
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone1 = String(req.body.phone1).replace(/[^\w\s]/gi, '');
        phone1 = String(phone1).length > 1 ? phone1.slice(0, 3) + "-" + phone1.slice(3, 6) + "-" + phone1.slice(6) : '-';
        let phone2 = String(req.body.phone2).replace(/[^\w\s]/gi, '');
        phone2 = String(phone2).length > 1 ? phone2.slice(0, 3) + "-" + phone2.slice(3, 6) + "-" + phone2.slice(6) : '-';
        let email = req.body.email;
        let bankaccount = req.body.accnumber;
        let bank = req.body.bank;
        let role = req.body.role;
        let remark = req.body.remark;

        const results = await services.updateMemberById(username, firstname, lastname, bankaccount, bank, phone1, phone2, email, role, remark, id);
        //validation
        if (!id || !firstname || !lastname) {
            return res.status(400).send({ error: true, message: 'Please provide Member\'s id firstname and lastname.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Member not found or data are same";
            } else {
                message = "Member successfully updated";
            }
            return res.send({ error: false, data: results, message: message, body: req.body })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;
