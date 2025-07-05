const express = require('express')
const router = express.Router();

const studentController = require('../controllers/student.controller');

router.get('/', studentController.findAll);
router.get('/:username', studentController.findOne);
router.post('/', studentController.create);
router.patch('/:username', studentController.update);
router.delete('/:username', studentController.delete);

module.exports = router;