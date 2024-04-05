const express = require('express')
const {register,login,selectUsers, forgotPassword, resetPassword,approveAgent,deleteUser} = require('../Controllers/auth.controller')
const {protect} = require('../Middlewares/auth.middleware')
const router = express.Router();


router.post('/register',protect, register);
router.post('/login', login)
router.get('/get-users',protect, selectUsers);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password', resetPassword)
router.post('/approve',protect,approveAgent),
router.delete('/delete-user',protect,deleteUser) 


module.exports = router