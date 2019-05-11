var config = {
    database: 'ursus',
    user: 'root',
    password: 'ts960619',
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = config;