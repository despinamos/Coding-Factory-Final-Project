const express = require('express')
const router = express.Router();

const studentClassController = require('../controllers/student.classes.controller');

router.get('/', studentClassController.findAll);
router.get('/:username', studentClassController.findOne);
router.post('/', studentClassController.create);
router.patch('/', studentClassController.update);
router.delete('/:username/classes/:className', studentClassController.delete);

module.exports = router;