module.exports = (sequelize, Sequelize) => {
    const Materi = sequelize.define('materi', {
        image: {
            type: Sequelize.STRING,
        },
        judul: {
            type: Sequelize.STRING,
        },
        deskripsi: {
            type: Sequelize.TEXT
        }
    });
    return Materi
}