const express = require('express')
const {addCustomerDetails,deleteCustomer} = require('../Controllers/customers.controller')
const {authenticateJWT} = require('../Middlewares/auth.middleware')
const router = express.Router();
router.post('/addcustomer', authenticateJWT, addCustomerDetails);
router.delete('/delete', authenticateJWT, deleteCustomer);

module.exports = router
