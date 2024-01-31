const express = require('express')
const {addCustomerDetails,deleteCustomer} = require('../Controllers/customers.controller')
const {authenticateJWT} = require('../Middlewares/auth.middleware')
const router = express.Router();
router.post('/addcustomer', addCustomerDetails);
router.delete('/delete', deleteCustomer);

module.exports = router
