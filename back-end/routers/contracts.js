// '/contracts'路由
const router = require('express').Router();
const Contract = require('../models/Contract');
const Express = require("../models/Express");

router.get("/contracts", function (req, res) {
    Contract.findAll().then(contracts => {
        console.log(contracts);
        res.send(contracts);
    });
});

router.get("/user_contracts", function (req, res) {
    let promiseArray = [];
    Contract.findAll(
        {
            where:
                { courierID: req.query.uid }
        }
    ).then(contracts => {
        contracts.forEach(contract => {
            console.log(contract.dataValues);
            promiseArray.push(
                Express.findOne(
                    {
                        where:
                            { eid: contract.dataValues.eid }
                    }
                )
            );
        });
        Promise.all(promiseArray).then(expresses => {
            console.log(expresses);
            res.send(expresses);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    });
});

router.get("/user_status_contracts", function (req, res) {
    let promiseArray = [];
    Contract.findAll(
        {
            where:
            {
                courierID: req.query.uid
            }
        }
    ).then(contracts => {
        contracts.forEach(contract => {
            console.log(contract.dataValues);
            promiseArray.push(
                Express.findOne(
                    {
                        where:
                        {
                            eid: contract.dataValues.eid,
                            status: req.query.status
                        }
                    }
                )
            );
        });
        Promise.all(promiseArray).then(expresses => {
            console.log(expresses);
            res.send(expresses);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    });
});

module.exports = router;