const mysql = require('mysql')
const dbConfig = require('../Config/db.config')
const queries = require('../Queries/query')
const pool = mysql.createPool(dbConfig); /* connection pool is technique 
used to efficiently manage and reuse database connections improving performance */

const executeQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const createDatabaseIfNotExists = async () => {
    try {
        const result = await executeQuery(queries.showDatabases);
        const DatabaseExists = result.length > 0;
        if (!DatabaseExists) {
            await executeQuery(queries.createDatabase);
            console.log('database created successfully')
        } else {
            console.log('Database already exists');
        }
    } catch (error) {
        throw error;
    }
}
const createTableIfNotExists = async () => {
    try {
        const result = await executeQuery(queries.showUsersTableQuery)
        const result2 = await executeQuery(queries.showCustomerDetailsTable)
        const result3 = await executeQuery(queries.showSerialsTableQuery);
        const userTableExists = result.length > 0;
        const customerTableExists = result2.length > 0;
        const serialsTableExists = result3.length > 0;
        if (!userTableExists) {
            await executeQuery(queries.createUserTableQuery);
            console.log(' user table was created successfully')
        } else if (!customerTableExists) {
            await executeQuery(queries.createCustomerDetailsTable);
            console.log(' customer table was created successfully')
        } else if (!serialsTableExists) {
            await executeQuery(queries.createSerialsTable);
            console.log("serials Table was created")
        }
        else {
            console.log('tables already exists')
        }
    } catch (error) {
        throw error;
    }
}

const insertUser = async (userData) => {
    const { name, email, password, phone, role } = userData;
    try {
        await executeQuery(queries.insertUsersQuery, [name, email, password, phone, role]);
        console.log('user added successfully')
    } catch (error) {
        throw error;
    }
}
const filterCustomersByDate = async (filterDates) => {
    const { startDate, endDate } = filterDates
    try {
        const result = await executeQuery(queries.filterCustomers, [startDate, endDate]);
        return result;
    } catch (error) {

    }
}
const selectUserByEmail = async (email) => {
    try {
        const result = await executeQuery(queries.selectUserByEmail, [email]);
        return result;
    } catch (error) {
        throw error;
    }
}
const selectUserByRole = async (role) => {
    try {
        const result = await executeQuery(queries.selectUserByRole, [role]);
        return result;
    } catch (error) {
        throw error;
    }
}
const insertCustomerDetails = async (userData) => {
    const { name, email, phone, payment_code } = userData;
    try {
        await executeQuery(queries.insertCustomerDetails, [name, email, phone, payment_code]);
        console.log('user added successfully')
    } catch (error) {
        throw error;
    }
}
const deleteCustomerDetails = async (email) => {
    try {
        await executeQuery(queries.deleteCustomerDetails, [email]);
        console.log('customer was deleted successfully')
    } catch (error) {
        throw error
    }
}
const allCustomers = async () => {
    try {
        const results = await executeQuery(queries.AllCustomers);

        return results

    } catch (error) {

    }
}
const selectUsers = async () => {
    try {
        const result = await executeQuery(queries.selectAllUsers);
       return result;
    } catch (error) {
        throw error;
    }
}
const addSerial = async (serialData) => {
    try {
        const { user_id, serial_no } = serialData;
        await executeQuery(queries.insertSerials, [user_id, serial_no])
        console.log("User added successfully");
    } catch (error) {
        throw error;
    }
}

const initializeDatabase = async () => {
    try {
        await createDatabaseIfNotExists()
        await executeQuery(queries.useDatabaseQuery);
        await createTableIfNotExists();
        //await createCustomerDetailsTableIfNotExists();
    } catch (error) {
        throw error;
    }
}


module.exports = {
    pool,
    initializeDatabase,
    insertUser,
    selectUserByEmail,
    insertCustomerDetails,
    addSerial,
    selectUsers,
    deleteCustomerDetails,
    selectUserByRole,
    filterCustomersByDate,
    allCustomers
}   