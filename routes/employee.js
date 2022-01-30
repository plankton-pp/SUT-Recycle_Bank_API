const express = require('express');
const router = express.Router();
const services = require('../services/employee.service')

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
router.get("/:ID", async (req, res) => {
    try {
        let id = req.params.ID;
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

router.post("/login", async (req, res) => {
    try {
        
        let Username = req.body.username;  
        let Password = req.body.password; 
        
        const result = await services.loginEmployee(Username, Password);
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Can not login";
        } else {
            message = "logged in";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

router.post("/", async (req, res) => {
    try {

        let Firstname = req.body.Firstname;  
        let Lastname = req.body.Lastname;  
        let Employee_ID = req.body.Employee_ID;  
        let Username = req.body.Username;  
        let Password = req.body.Password;  
        let Role = req.body.Role;  
        let Phone = req.body.Phone;  
        let Email = req.body.Email;  

        const results = await services.addEmployee(Firstname, Lastname, Employee_ID, Username, Password, Role, Phone, Email);
        //validation
        if (!Firstname || !Lastname || !Employee_ID || !Username || !Password || !Role || !Phone || !Email) {
            return res.status(400).send({ error: true, message: 'Please provide Employee\'s data.' })
        } else {
            return res.send({ error: false, data: results, message: 'Employee successfully added' })
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

//update data
router.put("/", async (req, res) => {
    try {
        let id = req.body.id;
        let Firstname = req.body.firstname;
        let Lastname = req.body.lastname;

        const results = await services.updateEmployeeById(Firstname, Lastname, id);
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