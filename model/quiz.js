// const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define('quiz', {
        quiz: {
            type: Sequelize.STRING,
        },
        a: {
            type: Sequelize.STRING,
        },
        b: {
            type: Sequelize.STRING,
        },
        c: {
            type: Sequelize.STRING,
        },
        d: {
            type: Sequelize.STRING,
        },
        key: {
            type: Sequelize.STRING,
        },
        id_materi: {
            type: Sequelize.INTEGER
        }
    });
    return Quiz;
}