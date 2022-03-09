const express = require('express');
const router = express.Router();
const services = require('../services/member.type.service')

router.get("/", async (req, res) => {
    try {
        const result = await services.getMemberType();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Employee table is empty";
            return res.status(400).send({ error: true, data: result, message: message })
        } else {
            message = "Successfully retrieved all member's types";
            return res.send({ error: false, data: result, message: message })
        }

    } catch (e) {
        throw e;
    }
});


router.post("/", async (req, res) => {
    try {
        let membertype = req.body.membertype;
        let remark = req.body.remark;

        const results = await services.addMemberType(membertype, remark);
        //validation
        if (!membertype) {
            return res.status(400).send({ error: true, message: 'Please provide type\'s name.' })
        } else {
            return res.send({ error: false, data: results, message: 'Type successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

//delete data by id
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deleteMemberTypeById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide type\'s id.' })
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
router.put("/", async (req, res) => {
    try {
        let id = req.body.id;
        let name = req.body.name;
        let author = req.body.author;

        const results = await services.updateBookById(name, author, id);
        //validation
        if (!id || !name || !author) {
            return res.status(400).send({ error: true, message: 'Please provide book\'s id name and author.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Book not found or data are same";
            } else {
                message = "Book successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;