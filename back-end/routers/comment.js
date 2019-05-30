// '/comment' 路由
const router = require('express').Router();
const Comment = require('../models/Comment');
const Express = require('../models/Express');

router.patch("/comment", function (req, res) {
    Comment.sync({ force: true }).then(res => {
        console.log(res);
    })
})

// 获取某一条评论
router.get("/comment", function (req, res) {
    let id = req.query.id;
    Comment.findOne(
        {
            where:
                { id: id }
        }
    ).then(comment => {
        console.log(comment);
        res.send(comment);
    });
});

// 新建一条评论
router.post("/comment", function (req, res) {
    let commentType = req.body.commentType;
    let eid = req.body.eid;
    let data = {
        eid: req.body.eid,
        fromID: req.body.fromID,
        toID: req.body.toID,
        value: req.body.value,
        content: req.body.content,
        commentType: req.body.commentType
    };
    Comment.create(
        data
    ).then(comment => {
        Express.findOne(
            {
                where:
                {
                    eid: eid
                }
            }
        ).then(express => {
            if (commentType == "c2o") {// courier to owner
                if (express.getDataValue("status") == "needComment") {
                    Express.update(
                        { status: "courierCommented" },
                        { where: { eid: eid } }
                    ).then(() => {
                        console.log("Updated");
                        res.status(200).send({ status: "success", info: "评论成功" });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({ status: "failed", info: "评论失败", error: err });
                    })
                }
                if (express.getDataValue("status") == "ownerCommented") {
                    Express.update(
                        { status: "finished" },
                        { where: { eid: eid } }
                    ).then(() => {
                        console.log("Updated");
                        res.status(200).send({ status: "success", info: "评论成功" });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({ status: "failed", info: "评论失败", error: err });
                    })
                }
            }
            if (commentType == "o2c") {// courier to owner
                if (express.getDataValue("status") == "needComment") {
                    Express.update(
                        { status: "ownerCommented" },
                        { where: { eid: eid } }
                    ).then(() => {
                        console.log("Updated");
                        res.status(200).send({ status: "success", info: "评论成功" });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({ status: "failed", info: "评论失败", error: err });
                    })
                }
                if (express.getDataValue("status") == "courierCommented") {
                    Express.update(
                        { status: "finished" },
                        { where: { eid: eid } }
                    ).then(() => {
                        console.log("Updated");
                        res.status(200).send({ status: "success", info: "评论成功" });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({ status: "failed", info: "评论失败", error: err });
                    })
                }
            }
        }).catch(err => {
            console.log(err);
            res.status(400).send({ status: "failed", info: "评论失败", error: err });
        })
    });
});

// 更新一条评论
router.put("/comment", function (req, res) {
    let id = req.body.id;
    let data = {
        eid: req.body.eid,
        fromID: req.body.fromID,
        toID: req.body.toID,
        value: req.body.value,
        content: req.body.content,
        commentType: req.body.commentType
    };
    for (let att in data) {
        if (data[att] === null || data[att] === undefined) {
            delete data[att];
        }
    }
    Comment.update(
        data,
        {
            where:
            {
                id: id
            }
        }
    ).then(() => {
        console.log("update success");
        res.status(200).send({ status: "success", info: "评论更新成功" });
    })
});

router.delete("/comment", function (req, res) {
    let id = req.body.id;
    Comment.delete(
        {
            where:
                { id: id }
        }
    ).then(() => {
        console.log("delete success");
        res.status(200).send({ status: "success", info: "删除成功" });
    })
})

module.exports = router;