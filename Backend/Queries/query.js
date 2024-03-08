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
    role VARCHAR(255),
    otp VARCHAR(6), 
    otp_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`  
const useDatabaseQuery = `USE ${dbConfig.database}`;
const insertUsersQuery = 'INSERT INTO users (name, email,password,phone,role,created_at) VALUES (?, ?, ?, ?,?,NOW())';
const selectUserByEmail = 'SELECT * FROM users WHERE email = ?'
const updateUserResetToken = `UPDATE users SET otp = ?, otp_expires = ? WHERE email = ?`
const selectUserWithToken = `SELECT * FROM users WHERE otp = ? AND otp_expires > ?`
const updateUserPassword = `UPDATE users SET password = ?, otp = NULL, otp_expires = NULL WHERE otp = ?`
const selectAllUsers = 'SELECT * FROM users'
const updateuserRole = 'UPDATE users SET role = ? WHERE ID = ?';
const deleteUsers = `DELETE FROM users WHERE email = ?`
const showCustomerDetailsTable = 'SHOW TABLES LIKE "customers"';
const createCustomerDetailsTable = `CREATE TABLE customers (
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,    
    email VARCHAR(255) UNIQUE NOT NULL,
    phone INT,
    payment_code VARCHAR(255) NOT NULL,
    user_id INT,
    status VARCHAR(255),
    serial VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(ID),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`  

const insertCustomerDetails = `INSERT INTO customers (name, email, phone, payment_code, user_id, status,serial,created_on)
VALUES (?, ?, ?, ?,?,? ,? , NOW())`;
const updateCustomerStatus = `UPDATE customers SET status = ? WHERE ID = ?`
const AllCustomers = `SELECT * FROM customers`;
const filterCustomers = `SELECT * FROM customers WHERE DATE(created_on) BETWEEN ? AND ? AND user_id = ?`;
const deleteCustomerDetails = `DELETE  FROM customers WHERE email = ?` 
module.exports = {
    createDatabase,        
    showDatabases,
    showUsersTableQuery,
    createUserTableQuery,
    useDatabaseQuery,  
    insertUsersQuery,      
    selectUserByEmail,   
    createCustomerDetailsTable,
    insertCustomerDetails,
    showCustomerDetailsTable,
    deleteCustomerDetails,   
    selectAllUsers, 
    filterCustomers,
    AllCustomers,
    updateUserPassword,  
    updateUserResetToken,
    selectUserWithToken,
    updateCustomerStatus,
    updateuserRole,  
    deleteUsers
}