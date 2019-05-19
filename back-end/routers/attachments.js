// '/attachments' 路由
const router = require('express').Router();
const Attachment = require('../models/Attachment');

router.get("/attachments", function (req, res) {
    eid = req.query.eid;
    Attachment.findAll(
        {
            where:
                { eid: eid }
        }
    ).then(attachments => {
        console.log(attachments);
        res.status(200).send(attachments);
    }).catch(err=>{
        console.log(err);
        res.status(400).send(err);
    });
});

module.exports = router;