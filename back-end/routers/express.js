// '/express'路由
const router = require('express').Router();
const Express = require('../models/Express');

// 获取某一条快递信息
router.get('/express', function (req, res) {
    Express.findOne(
        {
            where: { eid: req.query.eid }
        }
    ).then(express => {
        console.log(express);
        res.send(express);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

// 新建一条快递信息
router.post('/express', function (req, res) {
    Express.create(
        {
            eid: req.body.eid,
            uid: req.body.uid,
            content: req.body.content,
            getAddress: req.body.getAddress,
            sendAddress: req.body.sendAddress,
            deliveryDate: req.body.deliveryDate,
            deliveryFrom: req.body.deliveryFrom,
            deliveryTo: req.body.deliveryTo,
            statue: "created"
        }
    ).then(express => {
        console.log(express);
        res.send(express);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 更改快递信息
router.put('/express', function (req, res) {
    let eid = req.body.eid;
    let data = {
        eid: req.body.eid,
        uid: req.body.uid,
        content: req.body.content,
        getAddress: req.body.getAddress,
        sendAddress: req.body.sendAddress,
        deliveryDate: req.body.deliveryDate,
        deliveryFrom: req.body.deliveryFrom,
        deliveryTo: req.body.deliveryTo,
        statue: req.body.statue
    };
    // 去除参数中的空值
    for (let att in data) {
        if (data[att] === null || data[att] === undefined) {
            delete data[att];
        }
    }
    console.log(data);
    Express.update(
        data,
        {
            where:
                { eid: eid }
        }
    ).then(express => {
        console.log(express);
        res.send(express);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

// 删除某一条快递信息
router.delete('/express', function (req, res) {
    Express.destroy(
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