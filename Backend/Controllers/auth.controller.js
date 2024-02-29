const bcrypt = require('bcrypt')
const dbHandler = require('../Database/dbHandler')
const jwt = require("jsonwebtoken")
require('dotenv').config();
const crypto = require('crypto')
const transporter = require('../Middlewares/mail.middleware')
const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await dbHandler.selectUserByEmail(email);
        if (user.length > 0) {
            return res.status(400).json({ message: " email already exists" });
        }
        //hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone,
            role,
        }
        await dbHandler.insertUser(userData);
        return res.status(201).json({ message: "User was added successfully" });

    } catch (error) {
        console.error('Error adding customer details:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await dbHandler.selectUserByEmail(email);
        if (user.length === 0) {
            return res.status(401).json({ error: "invalid credentials" });
        }
        const passwordmatch = await bcrypt.compare(password, user[0].password);
        if (!passwordmatch) {
            return res.status(401).json({ error: "invalid credentials" });
        }
        const token = jwt.sign({
            userId: user[0].ID,
            role: user[0].role,
            name: user[0].name,
            email: user[0].email
        },
            process.env.JWT_SECRET, {
            expiresIn: "1h",
        })
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error adding customer details:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const selectUsers = async (req, res) => {
    try {
        const result = await dbHandler.selectUsers();
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({ message: "no users found" })
        }
    } catch (error) {
        console.error('Error adding customer details:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// forgot  password
const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const token = crypto.randomBytes(20).toString('hex');
    const expiration = new Date(Date.now() + 3600000); //expires in one hour
    const resetDetails = {
        email,
        token,
        expiration
    }
    try {
        await dbHandler.resetToken(resetDetails);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
              Please click on the following link, or paste this into your browser to complete the process:\n\n
              http://${req.headers.host}/auth/reset-password/${token}\n\n
              If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
               return  res.status(200).send('Password reset email sent');
            }
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ message: "Internal server error" });   
    }
}

//reset pasword from submission handling
const resetPassword = async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.password;
    const Currentdate = new Date();

    try {
        const tokenDetails = {
            token,
            Currentdate
        }
        const results = await dbHandler.validateToken(tokenDetails)

        if (results.length === 0) {
            return res.status(400).send('Invalid or expired token');
        }
        const newPasswordHashed = await bcrypt.hash(newPassword, 10)
        await dbHandler.resetPassword(newPasswordHashed, token);
        return res.status(200).send('Password reset successful');
        console.log("reset was successful")

    } catch (error) { 
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    register,
    login,
    selectUsers,
    forgotPassword,
    resetPassword
}