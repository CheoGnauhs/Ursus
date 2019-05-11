const Sequelize = require('sequelize');
const config = require('./config');

console.log("Init sequelize...")

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
});

module.exports = sequelize;