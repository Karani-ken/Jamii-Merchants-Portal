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
        console.error(error)
    }
}
const createTableIfNotExists = async () => {
    const tables = [
        { name: 'users', query: queries.showUsersTableQuery, createQuery: queries.createUserTableQuery },
        { name: 'customers', query: queries.showCustomerDetailsTable, createQuery: queries.createCustomerDetailsTable }

    ];
    try {
        for (const table of tables) {
            const tableInfo = await executeQuery(table.query);
            if (tableInfo.length === 0) {
                await executeQuery(table.createQuery);
                console.log(`${table.name} table was created successfully`);
            } else {
                console.log(`${table.name} table already exists`);
            }
        }
    } catch (error) {
        console.error(error)
    }
}

const insertUser = async (userData) => {
    const { name, email, password, phone, role } = userData;
    try {
        await executeQuery(queries.insertUsersQuery, [name, email, password, phone, role]);
        console.log('user added successfully')
    } catch (error) {
        console.error(error)
    }
}
const deleteUser = async (email) =>{
    try {
        await executeQuery(queries.deleteUsers, [email])
    } catch (error) {
        console.error(error)
    }
}
const filterCustomersByDate = async (filterData) => {
    const { startDate, endDate, user_id } = filterData
    try {
        const result = await executeQuery(queries.filterCustomers, [startDate, endDate, user_id]);
        console.log(result)
        return result;
    } catch (error) {
        console.error(error)
    }
}
const selectUserByEmail = async (email) => {
    try {
        const result = await executeQuery(queries.selectUserByEmail, [email]);
        return result;
    } catch (error) {
        console.error(error);
    }
}

//update and save reset_token
const resetOtp = async (ResetData) => {
    const { otp, expiration, email } = ResetData
    try {
        await executeQuery(queries.updateUserResetToken, [otp, expiration, email])
    } catch (error) {
        console.error(error)
    }
}
//validate if the token is valid
const validateOtp = async (resetDetails) => {
    const { otp, Currentdate } = resetDetails
    try {
        const result = await executeQuery(queries.selectUserWithToken, [otp, Currentdate])
        return result;
    } catch (error) {
        console.error(error)
    }
}
//reset password
const resetPassword = async (newPassword, otp) => {
    try {
        await executeQuery(queries.updateUserPassword, [newPassword, otp])
    } catch (error) {
        console.error(error)
    }
}

const insertCustomerDetails = async (userData) => {
    const { name, email, phone, payment_code, user_id,status, serial } = userData;
    try {
        await executeQuery(queries.insertCustomerDetails, [name, email, phone, payment_code, user_id, status, serial]);
        console.log('user added successfully')
    } catch (error) {
        console.log(Error)
    }
}
const deleteCustomerDetails = async (email) => {
    try {
        await executeQuery(queries.deleteCustomerDetails, [email]);
        console.log('customer was deleted successfully')
    } catch (error) {
        console.log(error)
    }
}
const allCustomers = async () => {
    try {
        const results = await executeQuery(queries.AllCustomers);

        return results

    } catch (error) {
        console.log(error)
    }
}
const selectUsers = async () => {
    try {
        const result = await executeQuery(queries.selectAllUsers);
        return result;
    } catch (error) {
        console.error(error)
    }
}
const updateStatus = async (ID, status) => {
    try {
        await executeQuery(queries.updateCustomerStatus,[ID, status])

    } catch (error) {
        console.log(error)
    }
}
const updateUserRole = async (ID, role) =>{
    try {
        await executeQuery(queries.updateuserRole, [ID, role]);
    } catch (error) {
        console.error(error)
    }
}

const initializeDatabase = async () => {
    try {
        await createDatabaseIfNotExists()
        await executeQuery(queries.useDatabaseQuery);
        await createTableIfNotExists();
        //await createCustomerDetailsTableIfNotExists();
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    pool,
    initializeDatabase,
    insertUser,
    selectUserByEmail,
    insertCustomerDetails,
    selectUsers,
    deleteCustomerDetails,
    filterCustomersByDate,
    allCustomers,
    resetPassword,
    resetOtp,
    validateOtp,
    updateStatus,
    updateUserRole,
    deleteUser
}   