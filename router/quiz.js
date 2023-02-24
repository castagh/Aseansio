//Mengambil data controller
const quizController = require('../controllers/quiz');
const router = require('express').Router();

//Menginisiasi endpoint, sama kek request di postman
router.post('/', quizController.create);
router.get('/', quizController.getAll);
router.get('/:id', quizController.findOne);
router.put('/:id', quizController.update);
router.delete('/:id', quizController.delete);
router.get('/category/:id', quizController.getByCategoryId);
router.get('/level/:id', quizController.getByLevelId);

module.exports = router;