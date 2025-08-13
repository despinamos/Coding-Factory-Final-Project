const express = require('express')
const router = express.Router();

const studentClassController = require('../controllers/student.classes.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/', verifyToken, studentClassController.findAll);
router.get('/:username', verifyToken, studentClassController.findOne);
router.post('/', verifyToken, studentClassController.create);
router.patch('/', verifyToken, studentClassController.update);
router.delete('/:username/classes/:className', verifyToken, studentClassController.delete);

module.exports = router;