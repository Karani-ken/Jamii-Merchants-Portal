require('dotenv').config();
const express = require('express')
const dbHandler = require('./Database/dbHandler')
const authRoutes = require('./Routes/auth.routes')
const cors = require('cors')
const customerRoutes = require('./Routes/customer.routes')
const app = express();
app.use(express.json());
app.use(cors())
//connect to a database
dbHandler.pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log("MySQL connected successfully");
        dbHandler.initializeDatabase()
    .then(()=>{
       connection.release()
    })
    .catch((err)=>{
        connection.release();   
        throw err;    
    })
})

app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);

app.listen(()=>{
   res.send(`<h1>Hello world I'm connected </h1>`)
});  