// '/expresses'路由
const router = require('express').Router();
const Express = require('../models/Express');

// 获取所有快递信息
router.get('/expresses', function (req, res) {
    Express.findAll().then(expresses => {
        console.log(expresses);
        res.send(expresses);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

router.get('/user_expresses', function (req, res) {
    let uid = req.query.uid;
    Express.findAll(
        {
            where:
                { uid: uid }
        }
    ).then(expresses => {
        console.log(expresses);
        res.status(200).send(expresses);
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

router.get('/user_status_expresses', function (req, res) {
    let uid = req.query.uid;
    let status = req.query.status;
    Express.findAll(
        {
            where:
            {
                uid: uid,
                status: status
            }
        }
    ).then(expresses => {
        console.log(expresses);
        res.status(200).send(expresses);
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
})

router.get('/status_expresses', function (req, res) {
    let status = req.query.status;
    Express.findAll(
        {
            where:
            {
                status: status
            }
        }
    ).then(expresses => {
        console.log(expresses);
        res.status(200).send(expresses);
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
})

module.exports = router;