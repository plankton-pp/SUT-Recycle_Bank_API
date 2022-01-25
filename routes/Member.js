const express = require('express');
const router = express.Router();
const services = require('../services/member.service')

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

router.post("/", async (req, res) => {
    try {
        
        let Member_User = req.body.user;  
        let Member_Password = req.body.password; 
        let Firstname = req.body.firstname; 
        let Lastname = req.body.lastname;  
        let Role = req.body.role; 
        let No_members = req.body.no; 
        let Bank = req.body.bank; 
        let Acc_number = req.body.accnumber; 
        let Phone_number = req.body.phone; 
        let Remark = req.body.remark; 

        const results = await services.addMember(Member_User, Member_Password, Firstname, Lastname, Role, No_members, Bank, Acc_number, Phone_number, Remark);
        //validation
        if (!Member_User || !Member_Password || !Firstname || !Lastname || !Role || !No_members || !Bank || !Acc_number || !Phone_number) {
            return res.status(400).send({ error: true, message: 'Please provide Member\'s data.' })
        } else {
            return res.send({ error: false, data: results, message: 'Member successfully added' })
        }
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



