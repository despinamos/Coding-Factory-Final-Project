const express = require('express')
const router = express.Router();

const studentController = require('../controllers/student.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/', verifyToken, studentController.findAll);
router.get('/:username', verifyToken, studentController.findOne);
router.post('/', studentController.create);
router.patch('/', verifyToken, verifyRoles("ADMIN"), studentController.update);
router.delete('/:username', verifyToken, verifyRoles("ADMIN"), studentController.delete);

module.exports = router;