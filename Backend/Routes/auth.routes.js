const express = require('express')
const {register,login,selectUsers} = require('../Controllers/auth.controller')
const {authenticateJWT} = require('../Middlewares/auth.middleware')
const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.get('/get-users',authenticateJWT, selectUsers)

module.exports = router