const materiController = require('../controllers/materi');
const router =  require('express').Router();

router.post('/', materiController.create);
router.get('/', materiController.getAll);
router.get('/:id', materiController.findOne);
router.put('/:id', materiController.update);
router.delete('/:id', materiController.delete);
router.get('/category/:id', materiController.getByCategoryId);

module.exports = router; 