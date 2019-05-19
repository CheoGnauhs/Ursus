// '/confirm' 路由
const web3 = require('web3');
const fs = require('fs');
const router = require('express').Router();
const Contract = require('../models/Contract');
const Express = require('../models/express');
const User = require('../models/User');

// 智能合约路径
var ExpressContractFile = "../build/contracts/ExpressContract.json";
var DeliveryRequest = JSON.parse(fs.readFileSync(ExpressContractFile));
// web3实例
const web3js = new web3(new web3.providers.HttpProvider("http://127.0.0.1:7545"));
// 智能合约ABI
let contractABI = DeliveryRequest.abi;
// 智能合约地址
var ExpressContractAdd = '0x07dB558bc86B7105daBF6710E228C1FA51e8F6D6';
// 智能合约实例
let expContract = new web3js.eth.Contract(contractABI, ExpressContractAdd);

// 确认收货
router.post("/confirm", function (req, res) {
    let eid = req.body.eid;
    let promiseArray = [];
    promiseArray.push(
        Contract.findOne(
            {
                where: {
                    eid: eid
                }
            }
        ),
        Contract.update(
            {
                status: "finished"
            },
            {
                where:
                    { eid: eid }
            }
        ),
        Express.update(
            {
                status: "needComment"
            },
            {
                where:
                    { eid: eid }
            }
        )
    );
    Promise.all(promiseArray).then(values => {
        let ownerID = values[0].ownerID;
        let courierID = values[0].courierID;
        let addressArray = [];
        addressArray.push(
            User.findOne(
                {
                    where: {
                        id: ownerID
                    }
                }
            ),
            User.findOne(
                {
                    where: {
                        id: courierID
                    }
                }
            )
        );
        Promise.all(addressArray).then(users => {
            let fromAddress = users[0].bcAddress;
            let toAddress = users[1].bcAddress;
            expContract.methods.ownerCheck(eid).send({ from: fromAddress, gas: 300000 }, (error, hash) => {
                if (!error)
                    console.log(hash);
                else console.log(error);
            });
            expContract.methods.expressmanCheck(eid).send({ from: toAddress, gas: 300000 }, (error, hash) => {
                if (!error)
                    console.log(hash);
                else console.log(error);
            });
            expContract.methods.finishExpress(eid).send({ from: toAddress, gas: 300000 }, (error, hash) => {
                if (!error)
                    console.log(hash);
                else console.log(error);
                expContract.methods.getExpress(eid).call({ from: fromAddress, gas: 300000 }, (error, result) => {
                    console.log(result);
                    res.send({ info: "交易完成", status: "success" });
                });
            });
        })
    })
});

module.exports = router;