// 用户数据表
const Sequelize = require('sequelize');
const sequelize = require('./database');

class User extends Sequelize.Model { };

User.init(
    {
        // 用户名
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 密码
        password: {
            type: Sequelize.STRING,
            allowNULL: false
        },
        // 区块链上的帐号
        bcAddress: {
            type: Sequelize.STRING
        },
        // 手机
        telephone: {
            type: Sequelize.STRING
        },
        // 用户类型（收件人/快递员）
        usertype: {
            type: Sequelize.ENUM("owner", "courier")
        }
    },
    {
        sequelize,
        modelName: 'user',
        tableName: 'users'
    }
);

module.exports = User;