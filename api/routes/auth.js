const express = require('express');
const controller = require('../controllers/auth')

const router = express.Router();

// /api/auth/login
router.post('/login', controller.login);
// /api/auth/register
router.post('/register', controller.register);

module.exports = router;