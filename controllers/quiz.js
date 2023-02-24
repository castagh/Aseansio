//Untuk menginisiasi atau mengambil models yang sudah dibuat
const db = require("../models");
//Otomatis nama databasenya quizzes
const Quiz = db.quizzes;

//Create untuk menambahkan data ke dalam tabel quiz
exports.create = async (req, res) => {
    //Try catch adalah salah satu error handling
    try {
        //Menginisiasi variable data dengan tipe data const pada js
        //await Quiz.create untuk menyimpan data dari req body yg diisi user di postman
        const data = await Quiz.create(req.body)
        res.json({
            message: "asik, data berhasil ditambahkan",
            //Menampilkan data yang ditambahkan
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}

//Read untuk menampilkan atau mengambil semua data quiz sesuai model dari database
exports.getAll = async(req, res) => {
    try {
        //Variable quizzes utk menyimpan smua data quiz yg didapat
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes retrieved successfully",
            data: quizzes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

//Update untuk mengubah data sesuai id yang dikirimkan
exports.update = async (req, res) => {
    //Menambahkan parameter dengan id
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            message: "Quizzes updated successfully",
            data: quiz,
        });
    }catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
}

//Delete untuk menghapus data sesuai data id yang dikirim
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        quiz.destroy()
        res.json({
            message: "Quiz deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
}

//Findone untuk menampilkan data sesuai id yang dikirim
exports.findOne = async (req, res) => {
    //Memberikan parameter untuk membaca id
    const id = req.params.id
    try {
        //Perintah untuk mencari data brdsrkn primary key (id)
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        res.json({
            message: `Quizzes retrieved successfully with id=${id}`,
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
}

//getByCategoryId untuk mengambil semua data quiz berdasarkan category
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where : {
            categoryId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with id=${id}`,
        data: quizzes,
    });
}

//getByLevelId untuk mengambil dan menampilkan data berdasarkan level
exports.getByLevelId = async (req, res) => {
    const id = req.params.id
    //Untuk menampung data yg didapat
    const quizzes = await Quiz.findAll({
        where : {
            levelId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with id=${id}`,
        data: quizzes,
    });
}