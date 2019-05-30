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
    var ExpressContractAdd = '0x91eaF31e7D8d0a30c654295C6797C24C047FC2f1';
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
    Promise.all(promiseArray).then(values => {
        values.forEach(e => {
            console.log(e);
        })
        res.status(200).send({ status: "success", info: "创建成功" });
    }).catch(error => {
        console.log(error)
        res.status(400).send({ status: "failed", info: "创建失败", error: error });
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
    for (let att in data) {
        if (data[att] === null || data[att] === undefined) {
            delete data[att];
        }
    }
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