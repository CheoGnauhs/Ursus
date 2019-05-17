// '/contract'路由
const router = require('express').Router();
const Contract = require('../models/Contract');

// 获取某个合约的内容
router.get('/contract', function (req, res) {
    Contract.findOne(
        {
            where:
                { eid: req.query.eid }
        }
    ).then(contract => {
        console.log(res);
        res.send(res);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 新建一个合约
router.post('/contract', function (req, res) {
    Contract.create(
        {
            eid: req.body.eid,
            ownerID: req.body.ownerID,
            courierID: req.body.courierID,
            deliveryFee: req.body.deliveryFee
        }.then(contract => {
            console.log(contract);
            res.send(contract);
        }).catch(err => {
            console.log(err);
            res.send(err);
        })
    );
});

// 更新一个合约内容
router.put('/contract', function (req, res) {
    let eid = req.body.eid;
    let data = {
        ownerID: req.body.ownerID,
        courierID: req.body.courierID,
        deliveryFee: req.body.deliveryFee
    };
    Contract.update(
        data,
        {
            where:
                { eid: eid }
        }
    ).then(contract => {
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
        res.send({ statue: "success", info: "deleted" });
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

module.exports = router;