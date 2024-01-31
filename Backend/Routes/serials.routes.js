const express = require('express')
const {authenticateJWT} = require('../Middlewares/auth.middleware')
const {addSerial} = require('../Controllers/serial.controller')
const router = express.Router();
router.post('/add-serial', authenticateJWT, addSerial);

module.exports = router;

