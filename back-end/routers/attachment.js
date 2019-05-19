// '/attachment' 路由
const router = require('express').Router();
const Attachment = require('../models/Attachment');

router.patch("/attachment", function (req, res) {
    Attachment.sync({ force: true }).then(response => {
        console.log(response);
        res.status(200).send(response);
    });
});

// 获取某个附件
router.put("/attachment", function (req, res) {
    id = req.query.id;
    Attachment.findOne(
        {
            where:
                { id: id }
        }
    ).then(attachment => {
        console.log(attachment);
        res.status(200).send(attachment);
    })
});

// 新建附件
router.post("/attachment", function (req, res) {
    Attachment.create(
        {
            eid: req.body.eid,
            url: req.body.url
        }
    ).then(attachment => {
        console.log(attachment);
        res.status(200).send({ status: "success", info: "添加附件成功" });
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

// 更新附件内容
router.put("/attachment", function (req, res) {
    let id = req.body.id;
    let data = {
        eid: req.body.eid,
        url: req.body.url
    };
    Attachment.update(
        data,
        {
            where:
                { id: id }
        }
    ).then(() => {
        console.log("update success");
        res.status(200).send({ status: "success", info: "附件更新成功" });
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

// 删除某个附件
router.delete("/attachment", function (req, res) {
    let id = req.body.id;
    Attachment.delete(
        {
            where:
                { id: id }
        }
    ).then(() => {
        console.log("delete success");
        res.status(200).send({ status: "success", info: "附件删除成功" });
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

module.exports = router;