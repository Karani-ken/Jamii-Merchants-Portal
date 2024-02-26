const dbHandler = require('../Database/dbHandler')
require('dotenv').config();
const nodemailer = require('nodemailer')
const fs = require('fs')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS 
    }
  });

const addCustomerDetails = async (req, res) =>{
   try {
    const {name,email, phone,payment_code,user_id} = req.body;
    const id_photo_front = req.files['id_photo_front'][0];
    const id_photo_back = req.files['id_photo_back'][0];

    if(!name|| !email || !phone || !payment_code || !user_id){
        res.status(400).json({message: "all fields are required"})
    }
    const customerData = {    
        name,        
        email,
        phone,
        payment_code,
        user_id
    }   
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email address
        to: process.env.EMAIL_RECIPIENT, // Receiver email address
        subject: 'Verification Documents',
        html: `
            <h4>Client Details</h4>
            <ul> 
                <li>Name: ${name} </li>
                <li>email: ${email} </li>
                <li>phone: ${phone} </li>
                <li>payment code: ${payment_code} </li>
            </ul>            
          <p>Please find the attached ID card photos for verification.</p>
        `,
        attachments: [
          {
            filename: id_photo_front.originalname,
            content: fs.createReadStream(id_photo_front.path)
          },
          {
            filename: id_photo_back.originalname,
            content: fs.createReadStream(id_photo_back.path)
          }
        ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Email sent successfully');
        }
      });
      await dbHandler.insertCustomerDetails(customerData);
      res.status(201).json({message: " customer was added successfully"});
   
   } catch (error) {
        throw error;  
   }     

}
const deleteCustomer = async (req, res) =>{
    try {
        const {email} = req.body;
        await dbHandler.deleteCustomerDetails(email);
        res.status(200).json({message: "customer details were deleted"});
    } catch (error) {
        throw error;
    }
}
const filterCustomers = async (req, res) =>{
  try {
    const {startDate, endDate,user_id} = req.body;
    const filterData = {
      startDate,
      endDate,
      user_id
    }
    const results = await dbHandler.filterCustomersByDate(filterData);
    console.log(results)
    res.status(200).json(results);
  } catch (error) {
    throw error;
  }
}
const getAllCustomers = async (req, res) =>{
  try {
    const results = await dbHandler.allCustomers();
    res.status(200).json(results)
  } catch (error) {
    throw error;
  }
}

module.exports = {
    addCustomerDetails,
    deleteCustomer,
    filterCustomers,
    getAllCustomers
}