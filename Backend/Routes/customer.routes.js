const express = require('express')
const {addCustomerDetails} = require('../Controllers/customers.controller')

const router = express.Router();
router.post('/addcustomer', addCustomerDetails);

module.exports = router
