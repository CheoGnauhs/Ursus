// 用户定位表
const sequelize = require('./database');
const Sequelize = require('sequelize');

class Location extends Sequelize.Model { };

Location.init(
    {
        // 用户ID
        uid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        // 纬度
        latitude: {
            type: Sequelize.STRING
        },
        // 经度
        longitude: {
            type: Sequelize.STRING
        },
        // 精准度
        accuracy: {
            type: Sequelize.STRING
        }
    },
    {
        sequelize,
        modelName: "location",
        tableName: "locations"
    }
);

module.exports = Location;