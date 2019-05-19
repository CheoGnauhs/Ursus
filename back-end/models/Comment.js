// 评价
const sequelize = require('./database');
const Sequelize = require('sequelize');

class Comment extends Sequelize.Model { };

Comment.init(
    {
        // id
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // 评价单号
        eid: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        // 评价者
        fromID: {
            type: Sequelize.INTEGER
        },
        // 被评价者
        toID: {
            type: Sequelize.INTEGER
        },
        //评价得分
        value: {
            type: Sequelize.INTEGER
        },
        // 评价内容
        content: {
            type: Sequelize.STRING
        },
        // 评价类型
        commentType: {
            type: Sequelize.ENUM("o2c", "c2o"),//owner to courier或者courier to owner
        }
    },
    {
        sequelize,
        modelName: "comment",
        tableName: "comments"
    }
);

module.exports = Comment;