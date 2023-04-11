// router materi

const router = require('express').Router();
const materiController = require('../controller/materi')

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), materiController.create);
router.post('/:id', upload.single('image'), materiController.update);
router.get('/', materiController.getAll)
router.get('/:id', materiController.findOne);
router.delete('/:id', materiController.delete);

module.exports = router;