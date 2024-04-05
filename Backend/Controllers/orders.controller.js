const dbHandler = require('../Database/dbHandler')
const fs = require('fs')
require('dotenv').config();
const transporter = require('../Middlewares/mail.middleware')

//TODO:CREATE ORDER
const createOrder = async (req, res) => {
    const { customer_name, customer_email, customer_contacts
        , customer_location, phone_model, service, orderItems } = req.body

    try {
        if (!customer_name || !customer_email || !customer_contacts || !customer_location) {
            return res.status(400).json({ error: "All fields are required!!" });
        }
        //check if customer already has an order
        const order = await dbHandler.getOrderByEmail(customer_email)
        if (order.length > 0) {
            return res.status(400).json({ messag: "email already exists" })
        }

        const orderDetails = {
            customer_name,
            customer_email,
            customer_contacts,
            customer_location,
            phone_model,
            service
        }
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email address
            to: process.env.EMAIL_RECIPIENT, // Receiver email address
            subject: 'Order',
            html: `
                  <h4>Order Details</h4>
                  <p>Customer Details </p>
                  <ul> 
                      <li>Name: ${customer_name} </li>
                      <li>email: ${customer_email} </li>
                      <li>phone: ${customer_contacts} </li>
                      <li>location: ${customer_location} </li>
                      <li>phone: ${phone_model} </li>
                  </ul>    
                  <p> Customer Order </p>   <br> <br>
                  <ul>
                  ${orderItems.map(itemData => `<li>${itemData}</li>`).join('')}
                </ul>                
             `
        };
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                await dbHandler.createOrder(orderDetails, orderItems);
            }
        });


        return res.status(200).json({ message: "order was placed successfully" })

    } catch (error) {   
        console.log(error)
        return res.status(500).json(error)
    }
}
//TODO: GET ORDERS

const getOrders = async (req, res) => {
    try {
        const result = await dbHandler.getOrders();
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


module.exports = {
    createOrder,
    getOrders
}