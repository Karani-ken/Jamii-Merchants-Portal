const dbConfig = require('../Config/db.config')
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
const showDatabases = `SHOW DATABASES LIKE "${dbConfig.database}"`
const showUsersTableQuery = 'SHOW TABLES LIKE "users"';
const createUserTableQuery = `CREATE TABLE users (
    ID binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone INT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    PRIMARY KEY (ID)
)
`
const useDatabaseQuery = `USE ${dbConfig.database}`;
const insertUsersQuery = 'INSERT INTO users (name, email,password,phone) VALUES (?, ?, ?, ?)';
const selectUserByEmail = 'SELECT * FROM users WHERE email = ?'
const selectUserByRole = 'SELECT * FROM users WHERE role = ? '
module.exports = {
    createDatabase,
    showDatabases,
    showUsersTableQuery,
    createUserTableQuery,
    useDatabaseQuery,
    insertUsersQuery,
    selectUserByEmail,
    selectUserByRole

}