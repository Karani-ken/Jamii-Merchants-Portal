const bcrypt = require('bcrypt')
const dbHandler = require('../Database/dbHandler')
const jwt = require("jsonwebtoken")
const register = async (req, res) =>{
    try {
        const {name, email, password, phone} = req.body;        
        //hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password:hashedPassword,
            phone
        }
        await dbHandler.insertUser(userData);
        res.status(201).json({message: "User was added successfully"});
        
    } catch (error) {       
        throw error;
    }
}

const login = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await dbHandler.selectUserByEmail(email);             
        if(!user){
            return res.status(401).json({error: "invalid credentials"});
        }
        const passwordmatch = await bcrypt.compare(password, user[0].password);
        if(!passwordmatch){
            return res.status(401).json({error: "invalid credentials"});
        }
        const token = jwt.sign({
            userId: user[0].ID,
            role:user[0].role,
            name: user[0].name,
            email: user[0].email
        },
             process.env.JWT_SECRET,{
            expiresIn: "1h",
        })
        res.status(200).json({token});
    } catch (error) {
        throw error;
    }
}

module.exports ={
    register,
    login
}