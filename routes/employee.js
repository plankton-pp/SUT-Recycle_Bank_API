const express = require('express');
const router = express.Router();
const services = require('../services/employee.service')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;

//retrieve all data
router.get("/", async (req, res) => {
    try {
        const result = await services.getEmployees();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Employee table is empty";
        } else {
            message = "Successfully retrieved all Employee";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

//retrieve data by id
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const result = await services.getEmployeeById(id);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Employee not found";
        } else {
            message = "Successfully retrieved Employee data";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

//retrieve data by empId
router.get("/checkEmp/:empId", async (req, res) => {
    try {
        let empId = req.params.empId;
        const result = await services.getEmployeeByEmpId(String(empId));
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Employee not found";
        } else {
            message = "Successfully retrieved Employee data";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

router.post("/checkDuplicate", async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    try {
        const resultsUsername = await services.getEmployeeByUsername(username);
        const resultsEmail = await services.getEmployeeByEmail(email);
        if ((resultsUsername === undefined || resultsUsername.length == 0) && (resultsEmail === undefined || resultsEmail.length == 0)) {
            return res.send({ error: false, dataUsername: resultsUsername, resultsEmail: resultsEmail, message: "no user duplicate", duplicateEmail: false, duplicateUsername: false })
        } else {
            if (resultsUsername.length > 0) {
                return res.send({ error: true, dataUsername: resultsUsername, resultsEmail: resultsEmail, message: "duplicate username", duplicateEmail: false, duplicateUsername: true })
            } else {
                return res.send({ error: true, dataUsername: resultsUsername, resultsEmail: resultsEmail, message: "duplicate email", duplicateEmail: true, duplicateUsername: false })
            }
        }
    } catch (e) {
        throw e;
    }
})

router.put("/register", async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const role = "Employee";
    const phone = req.body.phone;
    const empId = req.body.empId;
    const email = req.body.email;

    try {
        bcrypt.hash(password, saltRound, async (err, hash) => {
            if (err) {
                console.log(err);
            }

            //validation
            if (!username || !password || !firstname || !lastname || !empId || !role || !phone || !email) {
                return res.status(400).send({ error: true, message: 'Please provide Employee\'s data.' })
            } else {
                const results = await services.updateNewEmployee(firstname, lastname, username, hash, role, phone, empId, email);
                return res.send({ error: false, data: results, message: 'Employee successfully added' })
            }
        })
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

        const username = req.body.username;//username or email
        const password = req.body.password;

        const result = await services.authEmployee(username);
        let message = ""
        if (result === undefined || result.length === 0) {
            message = "No user exist";
            return res.send({ error: true, data: result, message: message })
        } else {
            bcrypt.compare(password, result[0].Password).then(function (response) {
                if (response) {
                    message = "Logged in";
                    const id = result[0].ID;
                    const token = jwt.sign({ id }, process.env.JWTSECRET, {
                        expiresIn: '5h',
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




//delete data by id
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deleteEmployeeById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide employee\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "Employee not found";
            } else {
                message = "Data successfully delete";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

router.put("/resetPassword", async (req, res) => {
    try {
        let email = req.body.email;
        let newpassword = req.body.newpassword;

        bcrypt.hash(newpassword, saltRound, async (err, hash) => {
            //validation
            if (!email || !newpassword) {
                return res.status(400).send({ error: true, message: 'Please provide Member\'s email and new password to reset.' })
            } else {
                const results = await services.resetPassword(email, hash);
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

//update data
router.put("/", async (req, res) => {
    try {
        let id = req.body.id;
        let Firstname = req.body.firstname;
        let Lastname = req.body.lastname;
        let Username = req.body.username;
        let Phone = req.body.phone;
        let Email = req.body.email;

        const results = await services.updateEmployeeById(Firstname, Lastname, Username, Phone, Email, id);
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


//add New Employee
router.post("/addnewemployee", async (req, res) => {
    try {
        let Empid = req.body.Empid;
        let Email = req.body.Email;


        //validation
        if (!Empid || !Email) {
            return res.status(400).send({ error: true, message: 'Please provide Empid and Email.' })
        } else {
            const results = await services.addNewEmployee(Empid, Email);
            let message = ""
            if (results.insertId === 0) {
                message = "Add new employee failed";
            } else {
                message = "successfully added new employee";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;