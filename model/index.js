const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAlias: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
}
)

const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.materi = require('./materi')(sequelize, Sequelize);
db.quiz = require('./quiz')(sequelize, Sequelize);

db.materi.hasMany(db.quiz, {
    foreignKey: 'id_materi',
})
db.quiz.belongsTo(db.materi, {
    foreignKey: 'id_materi',
})

module.exports = db;