const express = require('express');
const router = express.Router();

const servicesTransaction = require('../services/transaction.service')
const servicesWallet = require('../services/wallet.service')



const addTransaction2 = async (memid, empid, type, netprice) => {
    console.log(memid, empid, type, netprice);
    //validation
    if ( !memid || !empid || !type || !netprice) {
        return res.status(400).send({ error: true, message: 'Please provide placeid, memid, empid, type, netprice.' })
    } else {
        try {
            const results = await servicesTransaction.addTransaction2(memid, empid, type, netprice);
            return ['Transaction successfully added', results.insertId];
        } catch (error) {
            return 'Cannot add transaction: ' + error;
        }
    }

}

const withdrawWallet = async (memid, netprice) => {
    if (String(memid).length > 0) {
        //validation
        if (!netprice || !memid) {
            return res.status(400).send({ error: true, message: 'Please provide memid, netprice.' })
        } else {
            try {
                const results = await servicesWallet.updateWalletByIdWithdraw(netprice ,memid);
                return 'Wallet successfully update';
            } catch (error) {
                return 'Cannot update wallet: ' + error;
            }
        }
    }
}

router.post("/", async (req, res) => {
    try {
        let memid = req.body.memid;
        let empid = req.body.empid;       
        let netprice = req.body.netprice;
        let status = "Success";
        let type = "withdraw";
        //validation
        if (!memid  || !netprice || !status || !empid) {
            return res.status(400).send({ error: true, message: 'Please provide memid, placeby, netprice ,status, empid.' })
        } else {
            const resultsTransaction = await addTransaction2(memid, empid, type, netprice)

            try {
                let allResults = {};
                let transactionid = resultsTransaction.insertId;
                let message = {
                    transaction: '',
                    wallet: '',
                }

                message.transaction = resultsTransaction[0]
                message.wallet = await withdrawWallet(memid, netprice, transactionid)

                if (message.transaction.includes("Cannot") || message.wallet.includes("Cannot")) {
                    return res.send({ error: true, message: message })
                } else {
                    return res.send({ error: false, message: message })
                }
            } catch (e) {
                throw e;
            }
            

            //Finally
            // console.log(allResults);
            // return res.send(allResults)
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;