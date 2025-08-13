const express = require('express')
const router = express.Router();

const classController = require('../controllers/class.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/', verifyToken, classController.findAll);
router.get('/:className', verifyToken, classController.findOne);
router.post('/', verifyToken, verifyRoles("ADMIN"), classController.create);
router.patch('/', verifyToken, verifyRoles("ADMIN"), classController.update);
router.delete('/:className', verifyToken, verifyRoles("ADMIN"), classController.delete);

module.exports = router;