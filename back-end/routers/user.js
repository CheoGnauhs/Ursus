// '/user'路由
const web3 = require('web3');
const router = require('express').Router();
const User = require('../models/User');

// 区块链中所有账户
const web3js = new web3(new web3.providers.HttpProvider("http://127.0.0.1:7545"));
let bcAccounts = [];
web3js.eth.personal.getAccounts().then(res => {
    bcAccounts = res;
}).catch(err => {
    console.log(err);
});

// 根据ID查找某一个用户
router.get('/user', function (req, res) {
    User.findOne({
        where: {
            id: req.query.id
        }
    }).then(user => {
        console.log(user);
        res.send(user);
    });
})

// 创建新用户
router.post('/user', function (req, res) {
    User.create({
        username: req.body.username,
        realname: req.body.realname,
        password: req.body.password,
        usertype: req.body.usertype,
        telephone: req.body.telephone
    }).then(user => {
        // 根据id号来分配区块链帐号
        User.update(
            { bcAddress: bcAccounts[user.getDataValue('id')] },
            {
                where: {
                    id: user.getDataValue('id')
                }
            }
        ).then(user => {
            console.log(user);
            res.send(user);
        }).catch(err => {
            console.log(err);
            res.send(err);
        })
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 更新用户信息
router.put('/user', function (req, res) {
    let id = req.query.id;
    let data = {
        username: req.body.username,
        realname: req.body.realname,
        password: req.body.password,
        usertype: req.body.usertype,
        telephone: req.body.telephone,
        bcAddress: req.body.bcAddress
    };
    // 去除参数中的空值
    for (let att in data) {
        if (data[att] === null || data[att] === undefined) {
            delete data[att];
        }
    }
    User.update(data,
        {
            where:
                { id: id }
        }
    ).then(user => {
        console.log(user);
        res.send(user);
    }).catch(err => {
        console.log(user);
        res.send(err);
    });
});

// 删除用户
router.delete('/user', function (req, res) {
    User.destroy(
        { where: { id: req.query.id } }
    ).then(() => {
        console.log("Deleted");
        res.send({ statue: "success", info: "deleted" });
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

module.exports = router;