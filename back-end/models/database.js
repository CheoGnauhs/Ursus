const Sequelize = require('sequelize');

const sequelize = new Sequelize('ursus', 'root', 'ts960619', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.sequelize = sequelize;