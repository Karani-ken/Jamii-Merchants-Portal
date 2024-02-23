const express = require('express')
const {addCustomerDetails,deleteCustomer} = require('../Controllers/customers.controller')
const {authenticateJWT} = require('../Middlewares/auth.middleware')
const path = require('path')
// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({storage: storage});

const router = express.Router();
router.post('/addcustomer', upload.fields([{name: 'id_photo_front', maxCount: 1},
 {name: 'id_photo_back', maxCount: 1}]), addCustomerDetails);
router.delete('/delete', deleteCustomer);

module.exports = router
