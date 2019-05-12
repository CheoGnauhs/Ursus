// '/users'路由
const router = require('express').Router();
const User = require('../models/User');

// 查询用户表中所有数据
router.get('/users', function (req, res) {
    User.findAll().then(users => {
        res.send(users);
    });
});

module.exports = router;