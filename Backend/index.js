require('dotenv').config();
const express = require('express')
const dbHandler = require('./Database/dbHandler')
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth.routes')
const cors = require('cors')
const customerRoutes = require('./Routes/customer.routes')
const path = require('path')
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json())
app.use(cors())
//connect to a database
dbHandler.pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log("MySQL connected successfully");
    `<h1> mysql connected successfully </h1>`
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

app.listen();