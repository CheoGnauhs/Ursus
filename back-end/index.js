const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
const Sequelize = require('sequelize');
const fs = require('fs');
var MyContractFile = "../build/contracts/MyContract.json";
var ExpressContractFile = "../build/contracts/ExpressContract.json";


const app = express();


var MyContract = JSON.parse(fs.readFileSync(MyContractFile));
var DeliveryRequest = JSON.parse(fs.readFileSync(ExpressContractFile));


//new web3 instance
const web3js = new web3(new web3.providers.HttpProvider("http://127.0.0.1:7545"));
//new mysql orm
const sequelize = new Sequelize('ursus', 'root', 'ts960619', {
    host: 'localhost',
    dialect: 'mysql'
});

var myAddress = '0xB22ca5601532DD25407D767769ECDe75a7DF3E1A';
var toAddress = '0x9dc9397BCe4E9010CC7D995591d0dd5af81872d1';
var MyContractAdd = '0x660199D03de8D3037A255f81F3C3F017cA069f86';
var ExpressContractAdd = '0x07dB558bc86B7105daBF6710E228C1FA51e8F6D6';
var CreditContractAdd = '0x09D8040D3F6deCD890603Fed9Cc5C1B829dBeBDa';

app.get('/web3test', function (req, res) {

    //contract abi is the array that you can get from the ethereum wallet or etherscan
    let contractABI = MyContract.abi;
    //creating contract object
    let contract = new web3js.eth.Contract(contractABI, MyContractAdd);

    contract.methods.myFunction().call({ from: myAddress }, (error, result) => {
        console.log(result);
        res.send(result);
    })
});

app.get('/deliverytest', function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract object
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

app.get("/ownercheck", function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract object
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

app.get("/expressmancheck", function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract object
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

app.get("/finish", function (req, res) {
    let contractABI = DeliveryRequest.abi;
    //creating contract object
    let contract = new web3js.eth.Contract(contractABI, ExpressContractAdd);

    contract.methods.finishExpress(9527).send({ from: toAddress, gas: 300000 }).then((receipt)=>{
        console.log(receipt);
    })

    contract.methods.getExpress(9527).call({ from: myAddress, gas: 300000 }, (error, result) => {
        console.log(result);
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))