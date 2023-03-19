const db = require("../model");
const Quiz = db.quiz;

exports.create = async (req, res) => {
    try {
        data = await Quiz.create(req.body)
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
        const data = await Quiz.findAll();
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
        let data = await Quiz.findByPk(id, { rejectOnEmpty: true })
        data.update(req.body, {
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
        const data = await Quiz.findByPk(id, { rejectOnEmpty: true })
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
exports.getByMateri = async (req, res) => {
    const materi  = req.params.materi
    const quizzes = await Quiz.findAll({
        where : {
            id_materi: materi
        }
    })
    res.json({
        message: `quiz retrived successfully with Id Materi=${materi}`,
        data: quizzes
    })
}
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `quiz retrived successfully with id=${id}`,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retriving soal",
            data: null
        })
    }
}

exports.submitOne = async (req, res) => {
    try {
        var quiz = await Quiz.findOne({
            where: {
                id: req.body.quizId
            }
        })
        if (req.body.answer == quiz.key) {
            res.status(200).json({
                "message": `benar`
            });
        } else {
            res.status(200).json({
                "message": `jawaban benar adalah ${quiz.key}`
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.submitMany = async (req, res) => {
    const jobsheet = {
        quizId: req.body.quizId, //[2, 4]
        answer: req.body.answer //[ c, d]
    }
    try {
        let benar = 0;
        let totalSoal = jobsheet.quizId.length //2
        for (let i = 0; i < totalSoal; i++) {
            const quiz = await Quiz.findOne({
                limit: 1,
                where: {
                    id: jobsheet.quizId[i] 
                },
                order: [
                    ['id', 'desc']
                ]
            });
            if (quiz.key == jobsheet.answer[i]) {
                benar = benar + 1
            }
            
        }
        res.status(200).json({
            message: `benar ${benar} dari ${totalSoal} soal`
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}