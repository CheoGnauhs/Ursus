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
var ExpressContractAdd = '0x91eaF31e7D8d0a30c654295C6797C24C047FC2f1';
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

router.post("/user_confirm", function (req, res) {
    let promiseArray = [];
    let eid = req.body.eid;
    Express.findOne(
        {
            where:
            {
                eid: eid
            }
        }
    ).then(express => {
        if (express.getDataValue("status") == "courierChecked") {
            Contract.findOne(
                {
                    where:
                        { eid: eid }
                }
            ).then(contract => {
                promiseArray.push(
                    User.findOne(
                        {
                            where:
                                { id: contract.getDataValue("ownerID") }
                        }
                    ),
                    User.findOne(
                        {
                            where:
                                { id: contract.getDataValue("courierID") }
                        }
                    ),
                    Express.update(
                        { status: "needComment" },
                        {
                            where:
                            {
                                eid: eid
                            }
                        }
                    ),
                    Contract.update(
                        { status: "finished" },
                        {
                            where:
                            {
                                eid: eid
                            }
                        }
                    )
                );
                Promise.all(promiseArray).then(users => {
                    let ownerAddress = users[0].bcAddress;
                    let courierAddress = users[1].bcAddress;
                    expContract.methods.finishExpress(eid).send({ from: courierAddress }, (error, hash) => {
                        if (!error) {
                            console.log(hash);
                            expContract.methods.getExpress(eid).call({ from: ownerAddress }, (error, result) => {
                                if (!error) {
                                    console.log(result);
                                    res.status(200).send({ info: "交易完成", status: "success" });
                                }
                                else {
                                    console.log(error);
                                    res.status(400).send({ status: "failed", info: "交易失败", error: error });
                                }
                            });
                        }
                        else console.log(error);
                    });
                })
            })

        }
        else {
            Express.update(
                { status: "ownerChecked" },
                {
                    where:
                        { eid: eid }
                }
            ).then(() => {
                console.log("Updated");
                res.status(200).send({ info: "确认成功", status: "success" });
            }).catch(err => {
                console.log(err);
                res.status(400).send({ info: "确认失败", status: "failed", error: err });
            })
        }
    })
});

router.post("/courier_confirm", function (req, res) {
    let promiseArray = [];
    let eid = req.body.eid;
    Express.findOne(
        {
            where:
            {
                eid: eid
            }
        }
    ).then(express => {
        if (express.getDataValue("status") == "ownerChecked") {
            Contract.findOne(
                {
                    where:
                        { eid: eid }
                }
            ).then(contract => {
                promiseArray.push(
                    User.findOne(
                        {
                            where:
                                { id: contract.getDataValue("ownerID") }
                        }
                    ),
                    User.findOne(
                        {
                            where:
                                { id: contract.getDataValue("courierID") }
                        }
                    ),
                    Express.update(
                        { status: "needComment" },
                        {
                            where:
                            {
                                eid: eid
                            }
                        }
                    ),
                    Contract.update(
                        { status: "finished" },
                        {
                            where:
                            {
                                eid: eid
                            }
                        }
                    )
                );
                Promise.all(promiseArray).then(users => {
                    let ownerAddress = users[0].bcAddress;
                    let courierAddress = users[1].bcAddress;
                    expContract.methods.finishExpress(eid).send({ from: courierAddress }, (error, hash) => {
                        if (!error) {
                            console.log(hash);
                            expContract.methods.getExpress(eid).call({ from: ownerAddress }, (error, result) => {
                                if (!error) {
                                    console.log(result);
                                    res.status(200).send({ info: "交易完成", status: "success" });
                                }
                                else {
                                    console.log(error);
                                    res.status(400).send({ status: "failed", info: "交易失败", error: error });
                                }
                            });
                        }
                        else console.log(error);
                    });
                })
            })

        }
        else {
            Express.update(
                { status: "courierChecked" },
                {
                    where:
                        { eid: eid }
                }
            ).then(() => {
                console.log("Updated");
                res.status(200).send({ info: "确认成功", status: "success" });
            }).catch(err => {
                console.log(err);
                res.status(400).send({ info: "确认失败", status: "failed", error: err });
            })
        }
    })
});

module.exports = router;