const router = require('express').Router();
const User = require('../models/User');
const web3 = require('web3');

const web3js = new web3(new web3.providers.HttpProvider("http://127.0.0.1:7545"));

router.get("/balance", function (req, res) {
    id = req.query.id;
    User.findOne(
        {
            where:
            {
                id: id
            }
        }
    ).then(user => {
        console.log(user.getDataValue('bcAddress'));
        web3js.eth.getBalance(user.getDataValue('bcAddress')).then(balance => {
            console.log(balance);
            balance = web3js.utils.fromWei(balance, 'ether');
            res.send({ balance: balance, info: "查询成功", status: "success" });
        })
    })
})

module.exports = router;