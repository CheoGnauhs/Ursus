// 系统通知表
const sequelize = require('./database');
const Sequelize = require('sequelize');

class Notification extends Sequelize.Model { };

Notification.init(
    {
        // 接受消息的用户
        uid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // 通知内容
        content: {
            type: Sequelize.STRING,
        },
        // 时间戳
        timestamp: {
            type: Sequelize.timestamp,
        }
    },
    {
        sequelize,
        modelName: "notification",
        tableName: "notifications"
    }
);

module.exports = Notification;