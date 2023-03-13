module.exports = (sequelize, Sequelize) => {
    const Materi = sequelize.define('materi', {
        materi: {
            type: Sequelize.TEXT,
        },
        categoryId: {
            type: Sequelize.INTEGER,
        }
    });
    return Materi;
}