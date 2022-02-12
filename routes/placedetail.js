const express = require('express');
const router = express.Router();
const services = require('../services/placedetail.service')

//retrieve all data
router.get("/", async (req, res) => {
    try {
        const result = await services.getPlaceDetails();
        let message = ""
        if (result === undefined || result.length == 0) {
            message = "Place Details table is empty";
        } else {
            message = "Successfully retrieved all Place Details";
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

router.post("/", async (req, res) => {
    try {
        let placeid = req.body.placeid;
        let memberid = req.body.memberid;        
        let typeid = req.body.typeid;
        let typename = req.body.typename;
        let productid = req.body.productid;
        let productname = req.body.productname;
        let productprice = req.body.productprice;
        let unitdetail = req.body.unitdetail;      
        let fee = req.body.fee;
        let unit = req.body.unit;
        let totalprice = req.body.totalprice;
       
        const results = await services.addPlaceDetail(memberid, placeid,  typeid, typename, productid, productname, productprice, unitdetail, fee, unit, totalprice);
        //validation
        if (!placeid || !memberid || !typeid || !typename || !productid || !productname || !productprice || !unitdetail || !fee || !unit || !totalprice) {
            return res.status(400).send({ error: true, message: 'Please input all data.' })
        } else {
            return res.send({ error: false, data: results, message: 'placedetail successfully added' })
        }
    } catch (e) {
        throw e;
    }
});

//delete data by id
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const results = await services.deletePlaceDetailById(id);
        //validation
        if (!id) {
            return res.status(400).send({ error: true, message: 'Please provide placedetail\'s id.' })
        } else {
            let message = ""
            if (results.affectedRows === 0) {
                message = "Place Detail not found";
            } else {
                message = "Data successfully delete";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});

// //update data
router.put("/", async (req, res) => {
    try {
        let placedetailid = req.body.placedetailid;
        let memberid = req.body.memberid;
        let placeid = req.body.placeid;
        let typeid = req.body.typeid;
        let typename = req.body.typename;
        let productid = req.body.productid;
        let productname = req.body.productname;
        let productprice = req.body.productprice;
        let unitdetail = req.body.unitdetail;        
        let fee = req.body.fee;
        let unit = req.body.unit;
        let totalprice = req.body.totalprice;       
         
        const results = await services.updatePlaceDetailById(memberid, placeid,  typeid, typename, productid, productname, productprice, unitdetail,  fee, unit, totalprice, placedetailid);
        //validation
        if (!placeid || !memberid || !typeid || !typename || !productid || !productname || !productprice || !unitdetail  || !fee || !unit || !totalprice || !placedetailid) {
            return res.status(400).send({ error: true, message: 'Please provide all data.' })
        } else {
            let message = ""
            if (results.changedRows === 0) {
                message = "PlaceDetail not found or data are same";
            } else {
                message = "PlaceDetail successfully updated";
            }
            return res.send({ error: false, data: results, message: message })
        }
    } catch (e) {
        throw e;
    }
});


module.exports = router;



