// 快递附件
const sequelize = require('./database');
const Sequelize = require('sequelize');

class Attachment extends Sequelize.Model { };

Attachment.init(
    {
        // 附件ID号
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // 快递单号
        eid: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        // 附件链接
        url: {
            type: Sequelize.STRING
        }
    },
    {
        sequelize,
        tableName: "attachments",
        modelName: "attachment"
    }
)

module.exports = Attachment;