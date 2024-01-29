const mysql = require('mysql')
const dbConfig = require('../Config/db.config')
const queries = require('../Queries/query')
const pool = mysql.createPool(dbConfig); /* connection pool is technique 
used to efficiently manage and reuse database connections improving performance */

const executeQuery = (query, values=[])=>{
    return new Promise((resolve, reject) =>{
        pool.query(query, values,(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

const createDatabaseIfNotExists = async () =>{
    try {
        const result = await executeQuery(queries.showDatabases);              
        const DatabaseExists = result.length > 0;
        if(!DatabaseExists){
            await executeQuery(queries.createDatabase);
            console.log('database created successfully')
        }else{
            console.log('Database already exists');
        }
    } catch (error) {        
            throw error;        
    }
}
const createTableIfNotExists = async ()=>{
    try {
        const result = await executeQuery(queries.showUsersTableQuery)    
        const result2 = await executeQuery(queries.showCustomerDetailsTable)      
        const userTableExists = result.length > 0;
        const customerTableExists = result2.length > 0;
        if(!userTableExists){
            await executeQuery(queries.createUserTableQuery);
            console.log(' user table was created successfully')
        }else if(!customerTableExists){
            await executeQuery(queries.createCustomerDetailsTable);
            console.log(' customer table was created successfully')
        }
        else{
        console.log('tables already exists')
        }
    } catch (error) {
        throw error;
    }
}
/*const createCustomerDetailsTableIfNotExists = async ()=>{
    try {
        const result = await executeQuery(queries.showCustomerDetailsTable)       
        const tableExists = result.length > 0;
        if(!tableExists){
            await executeQuery(queries.createCustomerDetailsTable);
            console.log(' customer table was created successfully')
        }else{
        console.log('customer table already exists')
        }    
    } catch (error) {
        throw error;
    }
}*/

const insertUser = async (userData) =>{
    const {name, email, password, phone} = userData;
    try {
        await executeQuery(queries.insertUsersQuery, [name, email,password,phone]);
        console.log('user added successfully')
    } catch (error) {
        throw error;
    }
}
const selectUserByEmail = async (email) =>{
    try {
       const result = await executeQuery(queries.selectUserByEmail, [email]);           
        return result;
    } catch (error) {
        throw error;  
    }
}
const selectUserByRole = async (role) =>{
    try {
       const result = await executeQuery(queries.selectUserByRole, [role]);           
        return result;
    } catch (error) {
        throw error;
    }
}
const insertCustomerDetails = async (userData) =>{
    const {name, idPhoto, email, phone, paymentCode} = userData;
    try {
        await executeQuery(queries.insertCustomerDetails, [name, idPhoto, email,phone, paymentCode]);
        console.log('user added successfully')  
    } catch (error) {
        throw error;
    }
}


const initializeDatabase = async ()=>{
    try {
        await createDatabaseIfNotExists()
        await executeQuery(queries.useDatabaseQuery);
        await createTableIfNotExists();
        //await createCustomerDetailsTableIfNotExists();
    } catch (error) {
        throw error;
    }
}
   

module.exports ={
    pool,
    initializeDatabase,
    insertUser,
    selectUserByEmail
}   