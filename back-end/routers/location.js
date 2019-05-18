// '/location' 路由
const Location = require('../models/Location');
const router = require('express').Router();

// 获取某个用户的位置
router.get("/location", function (req, res) {
    Location.findOne(
        {
            where:
                { uid: req.query.uid }
        }
    ).then(location => {
        console.log(location);
        res.send(location);
    })
});

// 新建一个位置
router.post("/location", function (req, res) {
    Location.create(
        { uid: req.body.uid }
    ).then(() => {
        console.log("create location success");
        res.status(200).send({ status: "success", info: "新建定位成功" });
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

// 更新一个用户的位置
router.put("/location", function (req, res) {
    let uid = req.body.uid;
    let data = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        accuracy: req.body.accuracy
    };
    Location.update(
        data,
        {
            where:
            {
                uid: uid
            }
        }
    ).then(() => {
        console.log("location update success");
        res.status(200).send({ status: "success", info: "定位更新成功" });
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    });
});

// 删除一个位置
router.delete("/location", function (req, res) {
    Location.delete(
        { uid: req.query.uid }
    ).then(() => {
        console.log("delete location success");
        res.status(200).send({ status: "success", info: "删除定位成功" });
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

module.exports = router;