const express = require('express')
const router = express.Router();

const classController = require('../controllers/class.controller');

router.get('/', classController.findAll);
router.get('/:className', classController.findOne);
router.post('/', classController.create);
router.patch('/', classController.update);
router.delete('/:className', classController.delete);

module.exports = router;