// router quiz

const router = require('express').Router();
const quizController = require('../controller/quiz')

router.post('/', quizController.create);
router.put('/:id', quizController.update);
router.get('/', quizController.getAll)
router.get('/:id', quizController.findOne);
router.delete('/:id', quizController.delete);
router.get('/materi/:materi', quizController.getByMateri);
router.post('/jobsheet/one', quizController.submitOne);
router.post('/jobsheet/many', quizController.submitMany);

module.exports = router;