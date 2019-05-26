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
        Comment.count(
            {
                where:
                    { eid: comment.getDataValue('eid') }
            }
        ).then(count => {
            console.log(count);
            if (count == 2) {
                Express.update(
                    { status: "finished" },
                    {
                        where:
                            { eid: comment.getDataValue('eid') }
                    }
                ).then(response => {
                    console.log(response);
                    res.status(200).send({ comment: comment, status: "success", info: "评论创建完成" })
                }).catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                })
            }
            else {
                res.status(200).send({ comment: comment, status: "success", info: "评论创建完成" })
            }
        }).catch(err => {
            console.log(err);
            res.status(400).send(err);
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