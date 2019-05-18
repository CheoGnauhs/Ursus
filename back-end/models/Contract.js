// 合约数据表
const Sequelize = require('sequelize');
const sequelize = require('./database');

class Contract extends Sequelize.Model { };

Contract.init(
    {
        // 快递单号
        eid: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        // 收件人ID
        ownerID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        // 快递员ID
        courierID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // 快递费
        deliveryFee: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // 合约状态
        status: {
            type: Sequelize.ENUM("delivering", "userCheck", "courierCheck", "finished"),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "contract",
        tableName: "contracts"
    }
)

module.exports = Contract;