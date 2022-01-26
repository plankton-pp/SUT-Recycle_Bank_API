const express = require('express');
const router = express.Router();
const services = require('../services/place.service')

//retrieve all data
router.get("/places", async (req, res) => {
    try {
        const result = await services.getPlaces();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Place table is empty";
        } else {
            message = "Successfully retrieved all Places";
        }
        return res.send({ error: false, data: result, message: message })
    } catch (e) {
        throw e;
    }
});

//retrieve data by id
// router.get("/:id", async (req, res) => {
//     try {
//         let id = req.params.id;
//         const result = await services.getBookById(id);
//         let message = ""
//         if (result === undefined || result.length == 0) {
//             message = "Book not found";
//         } else {
//             message = "Successfully retrieved book data";
//         }
//         return res.send({ error: false, data: result, message: message })
//     } catch (e) {
//         throw e;
//     }
// });

router.post("/addPlace", async (req, res) => {
    try {
        let memid = req.body.memid;
        let placeby = req.body.placeby;
        let status = req.body.status;
        let empid = req.body.empid;

        const results = await services.addPlace(memid, placeby, status, empid);
        //validation
        if (!memid || !placeby|| !status|| !empid) {
            return res.status(400).send({ error: true, message: 'Please provide Place\'s memid placeby status or empid.' })
        } else {
            return res.send({ error: false, data: results, message: 'Place successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

//delete data by id
router.delete("/deleteplacebyid/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deletePlaceById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide Place\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "Place not found";
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
router.put("/updateplacebyid", async (req, res) => {
    try {        
        let id = req.body.id;
        let memid = req.body.memid;
        let placeby = req.body.placeby;
        let status = req.body.status;
        let empid = req.body.empid;

        const results = await services.updatePlaceById(memid, placeby, status, empid, id);
        //validation
        if (!memid || !placeby || !status || !empid || !id) {
            return res.status(400).send({ error: true, message: 'Please provide Place\'s memid placeby status empid or id.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "Place not found or data are same";
            } else {
                message = "Place  successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;



