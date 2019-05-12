// '/resetDB'路由
const router = require('express').Router();
const User = require('../models/User');
const Express = require('../models/Express');
const Contract = require('../models/Contract');

// 重新创建数据库
router.post('/resetDB', function (req, res) {
    console.log("Reconstruct tables...");
    User.sync({ force: true }).then(res => {
        console.log(res);
    });
    Express.sync({ force: true }).then(res => {
        console.log(res);
    });
    Contract.sync({ force: true }).then(res => {
        console.log(res);
    })
    console.log("success");
    res.send("success");
});

module.exports = router;