const express = require('express')
const {addCustomerDetails,deleteCustomer} = require('../Controllers/customers.controller')

const router = express.Router();
router.post('/addcustomer', addCustomerDetails);
router.post('/delete', deleteCustomer);

module.exports = router
