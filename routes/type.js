const express = require('express');
const router = express.Router();
const services = require('../services/type.service')

//retrieve all data
router.get("/types", async (req, res) => {
    try {
        const result = await services.getType();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "type table is empty";
        } else {
            message = "Successfully retrieved all books";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

router.post("/addtype", async (req, res) => {   
    try {
        console.log("req",req);
        
        let name = req.body.name;      
        let empid = req.body.empid;
     

        const results = await services.addType(name, empid);
        //validation
        if (!name || !empid) {
            return res.status(400).send({ error: true, message: 'Please provide Type\'s name and empid.' })
        } else {
            return res.send({ error: false, data: results, message: 'Type successfully added' })
        }
    } catch (e) {
        throw e;
    }
});


//delete data by id
router.delete("/deleteById/:id", async (req, res) => {
    try {
        console.log("type.id",req.params.id);
        let id = req.params.id;

        const results = await services.deleteTypeById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide Type\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "Type not found";
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
router.put("/updatetypebyid", async (req, res) => {
    try {
        console.log("req",req);
        let id = req.body.id;
        let name = req.body.name;       
        let empid = req.body.empid;

        const results = await services.updateTypeById(name, empid, id);
        //validation
        if (!id || !name || !empid) {
            return res.status(400).send({ error: true, message: 'Please provide Type\'s id name and empid.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Type not found or data are same";
            } else {
                message = "Type successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;