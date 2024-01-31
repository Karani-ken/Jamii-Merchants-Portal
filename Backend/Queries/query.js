const dbConfig = require('../Config/db.config')
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
const showDatabases = `SHOW DATABASES LIKE "${dbConfig.database}"`
const showUsersTableQuery = 'SHOW TABLES LIKE "users"';
const createUserTableQuery = `CREATE TABLE users (
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone INT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255)      
)
`  
const useDatabaseQuery = `USE ${dbConfig.database}`;
const insertUsersQuery = 'INSERT INTO users (name, email,password,phone,role) VALUES (?, ?, ?, ?,?)';
const selectUserByEmail = 'SELECT * FROM users WHERE email = ?'
const selectUserByRole = 'SELECT * FROM users WHERE role = ? '
const selectAllUsers = 'SELECT * FROM users'
const showCustomerDetailsTable = 'SHOW TABLES LIKE "customerdetails"';
const createCustomerDetailsTable = `CREATE TABLE customerdetails (
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    id_photo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone INT,
    payment_code VARCHAR(255) NOT NULL  
    )`   
const createSerialsTable = ` CREATE TABLE serials(
    serial_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    serial_no DECIMAL(24,0),

    FOREIGN KEY (user_id) REFERENCES users(ID)    
)     
`
const insertSerials = 'INSERT INTO serials (user_id, serial_no) VALUES (?, ?)'
const insertCustomerDetails =  `INSERT INTO customerDetails (name,id_photo, email, phone, payment_code)
 VALUES (?, ?, ?, ?, ?)`;
 const deleteCustomerDetails = `DELETE FROM customerDetails WHERE email = ?`
 const showSerialsTableQuery = 'SHOW TABLES LIKE "serials"'
module.exports = {
    createDatabase,        
    showDatabases,
    showUsersTableQuery,
    createUserTableQuery,
    useDatabaseQuery,  
    insertUsersQuery,   
    selectUserByEmail,
    selectUserByRole,
    createCustomerDetailsTable,
    insertCustomerDetails,
    showCustomerDetailsTable,
    deleteCustomerDetails,
    createSerialsTable,
    selectAllUsers,
    insertSerials,
    showSerialsTableQuery
}