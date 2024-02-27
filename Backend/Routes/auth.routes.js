const express = require('express')
const {register,login,selectUsers, forgotPassword, resetPassword} = require('../Controllers/auth.controller')
const {authenticateJWT} = require('../Middlewares/auth.middleware')
const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.get('/get-users', selectUsers);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password', resetPassword)

module.exports = router