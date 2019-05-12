// 快递数据表
const Sequelize = require('sequelize');
const sequelize = require('./database');

class Express extends Sequelize.Model { };

Express.init(
    {
        // 快递单号
        eid: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        // 快递收件人ID
        uid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // 快递取货地址
        getAddress: {
            type: Sequelize.STRING
        },
        // 快递送货地址
        sendAddress: {
            type: Sequelize.STRING
        },
        // 快递配送时间段起始值
        deliveryFrom: {
            type: Sequelize.STRING
        },
        // 快递配送时间段结束值
        deliveryTo: {
            type: Sequelize.STRING
        },
        // 快递当前状态
        statue: {
            type: Sequelize.ENUM('created', 'searching', 'delivering', 'ownerChecked', 'courierChecked', 'finished', 'cancelled'),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'express',
        tableName: 'expresses'
    }
);

module.exports = Express;