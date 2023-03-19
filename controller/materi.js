const db = require("../model");
const Materi = db.materi;
const Quiz = db.quiz

exports.create = async (req, res) => {
    try {
        let data = req.body
        if (req.file) {
            data.image = req.file.filename
        }
        data = await Materi.create(data)
        res.json({
            message: "quiz create successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}
exports.getAll = async (req, res) => {
    try {
        const data = await Materi.findAll({
            include: [{
                model: Quiz
            }],
        });
        res.json({
            message: "quiz retrieved successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        let data = await Materi.findByPk(id, { rejectOnEmpty: true })
        let body = req.body
        if (req.file) {
            body.image = req.file.filename
        }
        data.update(body, {
            where: { id }
        });
        res.json({
            message: "quiz updated successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Materi.findByPk(id, { rejectOnEmpty: true })
        data.destroy()
        res.json({
            message: `Data dengan id ${data.id} berhasil dihapus`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Materi.findByPk(id, { 
            rejectOnEmpty: true,
            include: [{
                model: Quiz,
            }],
        })
        res.json({
            message: `soal retrived successfully with id=${id}`,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retriving soal",
            data: null
        })
    }
}