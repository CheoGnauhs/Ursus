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

module.exports = router;