// '/comment' 路由
const router = require('express').Router();
const Comment = require('../models/Comment');

router.get("/comments", function (req, res) {
    Comment.findAll().then(comments => {
        console.log(comments);
        res.send(comments);
    })
});

router.post("/type_eid_comments", function (req, res) {
    let eid = req.body.eid;
    let commentType = req.body.commentType;
    Comment.findOne(
        {
            where:
            {
                eid: eid,
                commentType: commentType
            }
        }
    ).then(comment => {
        console.log(comment);
        res.status(200).send(comment);
    })
});

router.post("/to_user_comments", function (req, res) {
    let toID = req.body.toID;
    Comment.findAll(
        {
            where: {
                toID: toID
            }
        }
    ).then(comments => {
        console.log(comments);
        res.status(200).send(comments);
    })
});

router.post("/from_user_comments", function (req, res) {
    let fromID = req.body.fromID;
    Comment.findAll(
        {
            where: {
                fromID: fromID
            }
        }
    ).then(comments => {
        console.log(comments);
        res.status(200).send(comments);
    })
});

module.exports = router;