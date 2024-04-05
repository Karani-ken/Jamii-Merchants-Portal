const jwt = require('jsonwebtoken');
const dbHandler = require('../Database/dbHandler')
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)        

          
            console.log(decoded?.role)
            // Check if user is an admin
            if (decoded?.role !== 'admin') {
                console.error('Not authorized - Admin access required');
                return res.status(403).json("Admin Access required");
            }

            next();
        } catch (error) {
            console.error(error);
           return res.status(401);
        }
    }

    if (!token) {
        console.error('Not authorized ');
        return res.status(403).json("Not authorized");
    }
};

module.exports = { protect };
