// 系统通知表
const sequelize = require('./database');
const Sequelize = require('sequelize');

class Notification extends Sequelize.Model { };

Notification.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
        },
        // 是否已读
        isRead: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        sequelize,
        modelName: "notification",
        tableName: "notifications"
    }
);

module.exports = Notification;