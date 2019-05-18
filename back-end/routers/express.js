// '/express'路由
const router = require('express').Router();
const Express = require('../models/Express');

// 计算快递花费的函数
let calculateDeliveryFee = (fromSite, toSite, fromTime, toTime) => {
    let fee = 0;
    fromSite = fromSite.split(",");
    toSite = toSite.split(",");
    fromTime = fromTime.split(":");
    toTime = toTime.split(":");
    if (fromSite[0] != toSite[0]) {
        fee += 30;
    } else if (fromSite[1] != toSite[1]) {
        fee += 18;
    } else if (fromSite[2] != toSite[2]) {
        fee += 10;
    } else {
        fee += 6;
    }
    let hourMargin = fromTime[0] - toTime[0];
    let minMargin = fromTime[1] - toTime[1];
    let secMargin = fromTime[2] - toTime[2];
    hourMargin = Math.abs(hourMargin);
    minMargin = Math.abs(minMargin);
    secMargin = Math.abs(secMargin);
    fee += 0.1 * hourMargin + 0.01 * minMargin + 0.001 * secMargin;
    return fee;
}

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
    let eid = req.body.eid;
    // 计算快递费用
    let fee = calculateDeliveryFee(req.body.getRegion, req.body.sendRegion, req.body.deliveryFrom.split("T")[1].split(".")[0], req.body.deliveryTo.split("T")[1].split(".")[0]);
    Express.create(
        {
            eid: req.body.eid,
            uid: req.body.uid,
            content: req.body.content,
            getRegion: req.body.getRegion,
            sendRegion: req.body.sendRegion,
            getAddress: req.body.getAddress,
            sendAddress: req.body.sendAddress,
            deliveryDate: req.body.deliveryDate.split("T")[0],
            deliveryFrom: req.body.deliveryFrom.split("T")[1].split(".")[0],
            deliveryTo: req.body.deliveryTo.split("T")[1].split(".")[0],
            deliveryFee: fee,
            status: "created"
        }
    ).then(() => {
        Express.findOne(
            {
                where:
                    { eid: eid }
            }
        ).then(express => {
            console.log(express);
            res.status(200).send({ status: "success", info: "创建完成", express: express });
        });
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
        getRegion: req.body.getRegion,
        sendRegion: req.body.sendRegion,
        getAddress: req.body.getAddress,
        sendAddress: req.body.sendAddress,
        deliveryDate: req.body.deliveryDate,
        deliveryFrom: req.body.deliveryFrom,
        deliveryTo: req.body.deliveryTo,
        deliveryFee: req.body.deliveryFee,
        status: req.body.status
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
    ).then(() => {
        console.log("Express update success!");
        res.send({ status: "success", info: "更新成功" });
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
        res.send({ status: "success", info: "deleted" });
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

module.exports = router;