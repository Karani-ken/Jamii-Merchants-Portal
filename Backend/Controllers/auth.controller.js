const bcrypt = require('bcrypt')
const dbHandler = require('../Database/dbHandler')
const jwt = require("jsonwebtoken")
require('dotenv').config();
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
            return res.status(401).json({ error: "invalid credentials password" });
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
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP code
    const expiration = new Date(Date.now() + 3600000); // Expires in one hour

    const resetDetails = {
        email,
        otp,
        expiration
    };
    try {
        await dbHandler.resetOtp(resetDetails);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP (One-Time Password) for password reset is: ${otp}. This OTP is valid for one hour.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
               return  res.status(200).json('Password reset email sent');
            }
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ message: "Internal server error" });   
    }
}

//reset pasword from submission handling
const resetPassword = async (req, res) => {
    const otp = req.body.otp;
    const newPassword = req.body.password;
    const Currentdate = new Date();

    try {
        const resetDetails = {
            otp,
            Currentdate
        }
        const results = await dbHandler.validateOtp(resetDetails)

        if (results.length === 0) {
            return res.status(400).send('Invalid or expired token');
        }
        const newPasswordHashed = await bcrypt.hash(newPassword, 10)

        await dbHandler.resetPassword(newPasswordHashed, otp);
        console.log("reset was successful")
        return res.status(200).json('Password reset successful');        

    } catch (error) { 
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const approveAgent = async(req,res) =>{
    try {
        const {ID, role} = req.body;
        await dbHandler.updateUserRole(ID, role);
        console.log("Agent Approved");
        return res.status(200).json("Agent Approved");
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal server error"});
        
    }
}


module.exports = {
    register,
    login,
    selectUsers,
    forgotPassword,
    resetPassword,
    approveAgent
}