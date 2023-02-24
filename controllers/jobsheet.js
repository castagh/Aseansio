//Jobsheet ini untuk menampung jawaban yg dikirim user
//Penggunaan model Quiz
const db = require("../models");
//Mengambil database dan tabel pada quiz
const Quiz = db.quizzes;

//Terdapat dua method yakni submitOne dan submitMany

//Untuk memproses jawaban dari satu quiz
exports.submitOne = async (req, res) => {
    //Data didapat dari inputan user
    const jobsheet = {
        //Jd tu ntar di req body isinya ini
        quizId: req.body.quizId,
        answer: req.body.answer,
    };

    try {
        //Variable quiz
        var quiz = await Quiz.findOne({
            where: {
                id: req.body.quizId
            }
        });
        //If tu percabangan
        if (req.body.answer == quiz.key) {
            res.status(200).json({
                "message" : "benar cekali"
            })
        } else {
            res.status(200).json({
                "message" : `slah, jwbnnya ntu ${quiz.key}`
            })
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

//Untuk memproses jawaban lebih dari satu quiz dengan json array
exports.submitMany = async (req, res) => {
    //Data didapat dari inputan user
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,

        // quizId = [1,2],
        // answer = ["a","b"]
    };

    try {
        //Ini tu variable benar dengan let 0
        let benar = 0
        //Length 3
        let totalQuiz = jobsheet.quizId.length
        //For adalah perulangan
        //Let i adalah menginisiasi 0 smp dgn i krg dr total soal dmulai dr 0
        for (let i = 0; i < totalQuiz ; i++) {
            const quiz = await Quiz.findOne({
                limit: 1,
                where: {
                    id: jobsheet.quizId[i]
                },
                //Ini adalah bentuk array, dimulai dengan index 0
                order: [ [ 'id', 'DESC' ] ],
            });       
            //percabangan
            if(quiz.key == jobsheet.answer[i]){
                benar = benar + 1
            }
        }
        res.status(200).json({
            message: `benar ${benar} dari ${totalQuiz} quiz`
        })
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
