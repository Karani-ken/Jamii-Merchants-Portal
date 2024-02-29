require('dotenv').config();
const express = require('express')
const dbHandler = require('./Database/dbHandler')
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth.routes')
const customerRoutes = require('./Routes/customer.routes')
const serialRoutes = require('./Routes/serials.routes')
const path = require('path')
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json())
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
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);
app.use('/serial', serialRoutes)
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
} )

app.listen(port,()=>{
    console.log(`App started on http://localhost:${port}`);
})      