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
        // 内含物品
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 快递取货区域
        getRegion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 快递送货区域
        sendRegion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 快递取货地址
        getAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 快递送货地址
        sendAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 送货时间
        deliveryDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 快递配送时间段起始值
        deliveryFrom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 快递配送时间段结束值
        deliveryTo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 快递当前状态
        statue: {
            type: Sequelize.ENUM('created', 'searching', 'delivering', 'ownerChecked', 'courierChecked', 'needComment', 'finished', 'cancelled'),
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