const dbHandler = require('../Database/dbHandler')
const fs = require('fs')
require('dotenv').config();
const transporter = require('../Middlewares/mail.middleware')

const addCustomerDetails = async (req, res) => {
  try {
    const { name, email, phone, payment_code, user_id} = req.body;
    const id_photo_front = req.files['id_photo_front'][0];
    const id_photo_back = req.files['id_photo_back'][0];
    const passport = req.files['passport'][0];
    const payment_pic = req.files['payment_pic'][0];


    if (!name || !email || !phone || !payment_code || !user_id) {
    return  res.status(400).json({ message: "all fields are required" })
    }
    const customerData = {
      name,
      email,
      phone,
      payment_code,   
      user_id,
      status:"pending"
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
        },
        {
          filename: passport.originalname,
          content: fs.createReadStream(passport.path)
        },
        {
          filename: payment_pic.originalname,
          content: fs.createReadStream(payment_pic.path)
        }
      ]
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        try {
          await dbHandler.insertCustomerDetails(customerData);
          return res.status(201).json({ message: "Customer was added successfully" });
        } catch (insertError) {
          console.error('Error inserting customer details:', insertError);
          return res.status(500).json({ message: "Error inserting customer details" });
        }
      }
    });


  } catch (error) {
    console.error('Error adding customer details:', error);
    return res.status(500).json({ message: "Internal server error" });
  }

}
const deleteCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    await dbHandler.deleteCustomerDetails(email);
    return res.status(200).json({ message: "customer details were deleted" });
  } catch (error) {
    console.error('Error adding customer details:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const filterCustomers = async (req, res) => {
  try {
    const { startDate, endDate, user_id } = req.body;
    const filterData = {
      startDate,
      endDate,
      user_id
    }
    const results = await dbHandler.filterCustomersByDate(filterData);
    console.log(results)
   return res.status(200).json(results);
  } catch (error) {
    console.error('Error adding customer details:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const getAllCustomers = async (req, res) => {
  try {
    const results = await dbHandler.allCustomers();
    return res.status(200).json(results)
  } catch (error) {
    console.error('Error adding customer details:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const updateCustomerStatus = async (req, res)=>{
  const {status, ID} = req.body
  try {
      await dbHandler.updateStatus(status,ID)
      console.log("status updated successfully")
      return res.status(201).json("updated successfully")
  } catch (error) {
      console.error(error);
      return res.status(500).json({message:"Internal server error"})
  }
}

module.exports = {
  addCustomerDetails,
  deleteCustomer,
  filterCustomers,
  getAllCustomers,
  updateCustomerStatus
}