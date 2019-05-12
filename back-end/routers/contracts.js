// '/contracts'路由
const router = require('express').Router();
const Contract = require('../models/Contract');

router.get("/contracts", function (req, res) {
    Contract.findAll().then(contracts => {
        console.log(contracts);
        res.send(contracts);
    });
});

module.exports = router;