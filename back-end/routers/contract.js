// '/contract'路由
const router = require('express').Router();
const web3 = require('web3');
const fs = require('fs');
const Contract = require('../models/Contract');
const Express = require('../models/express');
const User = require('../models/User');

// 智能合约路径
var ExpressContractFile = "../build/contracts/ExpressContract.json";
var DeliveryRequest = JSON.parse(fs.readFileSync(ExpressContractFile));
// web3实例
const web3js = new web3(new web3.providers.HttpProvider("http://127.0.0.1:7545"));

// 获取某个合约的内容
router.get('/contract', function (req, res) {
    Contract.findOne(
        {
            where:
                { eid: req.query.eid }
        }
    ).then(contract => {
        console.log(contract);
        res.send(contract);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 新建一个合约
router.post('/contract', function (req, res) {
    let contractABI = DeliveryRequest.abi;
    var ExpressContractAdd = '0x07dB558bc86B7105daBF6710E228C1FA51e8F6D6';
    let expContract = new web3js.eth.Contract(contractABI, ExpressContractAdd);
    let fromAddress;
    let toAddress;
    let promiseArray = [];
    promiseArray.push(
        Contract.create(
            {
                eid: req.body.eid,
                ownerID: req.body.ownerID,
                courierID: req.body.courierID,
                deliveryFee: req.body.deliveryFee,
                status: "delivering"
            }
        )
    );
    promiseArray.push(
        Express.update(
            { status: "delivering" },
            {
                where: {
                    eid: req.body.eid
                }
            }
        )
    )
    promiseArray.push(
        User.findOne(
            {
                where: {
                    id: req.body.ownerID
                }
            }
        )
    );
    promiseArray.push(
        User.findOne(
            {
                where: {
                    id: req.body.courierID
                }
            }
        )
    );
    Promise.all(promiseArray).then(values => {
        fromAddress = values[2].bcAddress;
        toAddress = values[3].bcAddress;
        console.log(fromAddress);
        console.log(toAddress);
        expContract.methods.init(req.body.eid, toAddress).send({ from: fromAddress, gas: 300000, value: web3js.utils.toWei(req.body.deliveryFee + '', 'ether') }, (error, hash) => {
            if (!error)
                console.log(hash);
            else {
                console.log(error);
                res.send(error);
            }
            //回调函数中去看结果
            expContract.methods.getExpress(req.body.eid).call({ from: fromAddress, gas: 300000 }, (error, result) => {
                if (!error) {
                    console.log(result);
                    res.send({ status: "success", info: "智能合约建立完毕" });
                }
                else {
                    console.log(error);
                    res.send(error);
                }
            });
        })
    }).catch(error => {
        console.log(error)
    });
});

// 更新一个合约内容
router.put('/contract', function (req, res) {
    let eid = req.body.eid;
    let data = {
        ownerID: req.body.ownerID,
        courierID: req.body.courierID,
        deliveryFee: req.body.deliveryFee,
        status: req.body.status
    };
    Contract.update(
        data,
        {
            where:
                { eid: eid }
        }
    ).then(() => {
        console.log("Updated");
        res.send({ status: "success", info: "合约内容已经更新" });
        console.log(contract);
        res.send(contract);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 删除一个合约
router.delete('/contract', function (req, res) {
    Contract.destroy(
        {
            where:
                { eid: req.body.eid }
        }
    ).then(() => {
        console.log("Deleted");
        res.send({ status: "success", info: "合约已经删除" });
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

module.exports = router;