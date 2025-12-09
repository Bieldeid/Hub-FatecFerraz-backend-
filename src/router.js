const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });

const adminController = require('./controller/Admin');
const userController = require('./controller/User');

router.post('/cadastroConfirmaUser', userController.createConfirmaUser)

module.exports = router;