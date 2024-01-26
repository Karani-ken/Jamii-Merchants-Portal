const express = require('express')
const dbHandler = require('./Database/dbHandler')
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
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

app.listen(port,()=>{
    console.log(`App started on http://localhost:${port}`);
})