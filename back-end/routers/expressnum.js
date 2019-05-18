// '/expressnum' router
const router = require('express').Router();
const ExpressNum = require('../models/ExpressNum');

router.get("/expressnum", function (req, res) {
    let count = [];
    let en = ExpressNum.build({ uid: req.query.uid });
    en.getUnsubmittedExpress().then(num => {
        count.push(num);
        en.getProcessingExpress().then(num => {
            count.push(num);
            en.getNeedCommentExpress().then(num => {
                count.push(num);
                en.getFinishedExpress().then(num => {
                    count.push(num);
                    res.status(200).send(
                        {
                            unsubmitted: count[0],
                            processing: count[1],
                            needcomment: count[2],
                            finished: count[3]
                        });
                });
            });
        });
    });
});

module.exports = router;