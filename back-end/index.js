const web3 = require('web3');
const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('./models/database');
const fs = require('fs');
const bodyParser = require('body-parser');
// const Tx = require('ethereumjs-tx'); 也许后面会有用

// 智能合约JSON文件路径
var MyContractFile = "../build/contracts/MyContract.json";
var ExpressContractFile = "../build/contracts/ExpressContract.json";
// 读取智能合约JSON文件
var MyContract = JSON.parse(fs.readFileSync(MyContractFile));
var DeliveryRequest = JSON.parse(fs.readFileSync(ExpressContractFile));

// 数据库Models
const User = require('./models/User');
const Express = require('./models/Express');

const app = express();
app.use(bodyParser.json());

//new web3 instance
const web3js = new web3(new web3.providers.HttpProvider("http://127.0.0.1:7545"));


// 区块链中所有账户
let bcAccounts = [];
web3js.eth.personal.getAccounts().then(res => {
    bcAccounts = res;
}).catch(err => {
    console.log(err);
})

var myAddress = '0xB22ca5601532DD25407D767769ECDe75a7DF3E1A';
var toAddress = '0x9dc9397BCe4E9010CC7D995591d0dd5af81872d1';
var MyContractAdd = '0x660199D03de8D3037A255f81F3C3F017cA069f86';
var ExpressContractAdd = '0x07dB558bc86B7105daBF6710E228C1FA51e8F6D6';
var CreditContractAdd = '0x09D8040D3F6deCD890603Fed9Cc5C1B829dBeBDa';

// 重新创建数据库
app.post('/resetDB', function (req, res) {
    console.log("Reconstruct tables...");
    User.sync({ force: true }).then(res => {
        console.log(res);
    });
    Express.sync({ force: true }).then(res => {
        console.log(res);
    });
    User.hasMany(Express);
    Express.belongsTo(User, { foreignKey: 'uid' });
    console.log("success");
    res.send("success");
});

// 测试数据库连通性
app.get('/dbtest', function (req, res) {
    sequelize.authenticate().then(() => {
        console.log("Connection has benn established successfully.");
        res.send("Connection has benn established successfully.");
    }).catch(err => {
        console.log("Cannot connnect to database:", err);
        res.send("Cannot connnect to database:", err);
    })
});

// 查询用户表中所有数据
app.get('/users', function (req, res) {
    User.findAll().then(users => {
        res.send(users);
    });
});

// 根据ID查找某一个用户
app.get('/user', function (req, res) {
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
app.post('/user', function (req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype
    }).then(user => {
        // 根据id号来分配区块链帐号
        User.update({ bcAddress: bcAccounts[user.getDataValue('id')] },
            {
                where: {
                    id: user.getDataValue('id')
                }
            }
        ).then(user => {
            res.send("user");
        })
    });
});

// 更新用户信息
app.put('/user', function (req, res) {
    let id = req.query.id;
    let data = {
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype,
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
app.delete('/user', function (req, res) {
    User.destroy(
        { where: { id: req.query.id } }
    ).then(() => {
        console.log("Deleted");
        res.send("Deleted");
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 获取所有快递信息
app.get('/expresses', function (req, res) {
    Express.findAll().then(expresses => {
        console.log(expresses);
        res.send(expresses);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 获取某一条快递信息
app.get('/express', function (req, res) {
    Express.findOne(
        {
            where: { id: req.query.id }
        }
    ).then(express => {
        console.log(express);
        res.send(express);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

// 新建一条快递信息
app.post('/express', function (req, res) {
    Express.create(
        {
            eid: req.body.eid,
            uid: req.body.uid,
            address: req.body.address,
            deliveryFrom: req.body.deliveryFrom,
            deliveryTo: req.body.deliveryTo,
            statue: "created"
        }
    ).then(express => {
        console.log(express);
        res.send(express);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 更改快递信息
app.put('/express', function (req, res) {
    let eid = req.body.eid;
    let data = {
        uid: req.body.uid,
        address: req.body.address,
        deliveryFrom: req.body.deliveryFrom,
        deliveryTo: req.body.deliveryTo,
        statue: req.body.statue
    };
    // 去除参数中的空值
    for (let att in data) {
        if (data[att] === null || data[att] === undefined) {
            delete data[att];
        }
    }
    console.log(data);
    Express.update(
        data,
        {
            where:
                { eid: eid }
        }
    ).then(express => {
        console.log(express);
        res.send(express);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

app.delete('/express', function (req, res) {
    Express.destroy(
        {
            where:
                { eid: req.body.eid }
        }
    ).then(() => {
        console.log("Deleted");
        res.send("Deleted");
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

// 获取区块链中目前激活的帐号
app.get('/getaccounts', function (req, res) {
    web3js.eth.personal.getAccounts().then(response => {
        console.log(response);
        res.send(response);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

// 测试web3是否能成功调用区块链API
app.get('/web3test', function (req, res) {

    //contract abi is the array that you can get from the ethereum wallet or etherscan
    let contractABI = MyContract.abi;
    //creating contract dataect
    let contract = new web3js.eth.Contract(contractABI, MyContractAdd);

    contract.methods.myFunction().call({ from: myAddress }, (error, result) => {
        console.log(result);
        res.send(result);
    })
});

// 发起新建快递单请求
app.get('/deliverytest', function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract dataect
    let contract = new web3js.eth.Contract(contractABI, ExpressContractAdd);

    contract.methods.init(9527, toAddress).send({ from: myAddress, gas: 300000, value: web3js.utils.toWei(10 + '', 'ether') }, (error, hash) => {
        if (!error)
            console.log(hash);
        else console.log(error)
        //回调函数中去看结果
        contract.methods.getExpress(9527).call({ from: myAddress, gas: 300000 }, (error, result) => {
            console.log(result);
        })
    })
});

// 发起收货人确认请求
app.get("/ownercheck", function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract dataect
    let contract = new web3js.eth.Contract(contractABI, ExpressContractAdd);

    contract.methods.ownerCheck(9527).send({ from: myAddress, gas: 300000 }, (error, hash) => {
        if (!error)
            console.log(hash);
        else console.log(error);

        contract.methods.getExpress(9527).call({ from: myAddress, gas: 300000 }, (error, result) => {
            console.log(result);
        })
    })
})

// 发起快递员确认请求
app.get("/expressmancheck", function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract dataect
    let contract = new web3js.eth.Contract(contractABI, ExpressContractAdd);

    contract.methods.expressmanCheck(9527).send({ from: toAddress, gas: 300000 }, (error, hash) => {
        if (!error)
            console.log(hash);
        else console.log(error);

        contract.methods.getExpress(9527).call({ from: myAddress, gas: 300000 }, (error, result) => {
            console.log(result);
        })
    })
})

// 发起转账请求
app.get("/finish", function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract dataect
    let contract = new web3js.eth.Contract(contractABI, ExpressContractAdd);

    contract.methods.finishExpress(9527).send({ from: toAddress, gas: 300000 }).then((receipt) => {
        console.log(receipt);
    })

    contract.methods.getExpress(9527).call({ from: myAddress, gas: 300000 }, (error, result) => {
        console.log(result);
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))