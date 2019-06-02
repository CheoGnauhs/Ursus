const router = require('express').Router();
const Comment = require('../models/Comment');

router.get("/credit", function (req, res) {
    id = req.query.id;
    Comment.findAll(
        {
            where:
                { toID: id }
        }
    ).then(comments => {
        let value = 3;
        if (comments.length != 0) {
            value = 0;
            console.log(comments);
            comments.forEach(e => {
                value += e.value;
            });
            value = value / comments.length;
            console.log(value);
            res.status(200).send({ credit: value, status: "success", info: "查询成功" });
        }
        else {
            res.status(200).send({ credit: value, status: "success", info: "查询成功" });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

module.exports = router;