// '/testDB'路由
const router = require('express').Router();
const sequelize = require('../models/database');

// 测试数据库连通性
router.get('/testDB', function (req, res) {
    sequelize.authenticate().then(() => {
        console.log("Connection has benn established successfully.");
        res.send("Connection has benn established successfully.");
    }).catch(err => {
        console.log("Cannot connnect to database:", err);
        res.send("Cannot connnect to database:", err);
    })
});

module.exports = router;