const express = require('express')
const {createOrder, getOrders} = require('../Controllers/orders.controller')

const router = express.Router();

router.post('/create-order', createOrder)
router.get('/get-orders', getOrders)

module.exports = router