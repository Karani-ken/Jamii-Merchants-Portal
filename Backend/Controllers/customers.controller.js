const dbHandler = require('../Database/dbHandler')
const addCustomerDetails = async (req, res) =>{
   try {
    const {name, idPhoto, email, phone, paymentCode} = req.body;
    if(!name || !idPhoto || !email || !phone || paymentCode){
        res.status(400).json({message: "all fields are required"})
    }
    const customerData = {
        name,
        idPhoto,
        email,
        phone,
        paymentCode
    }
    await dbHandler.insertCustomerDetails(customerData);
    res.status(201).json({message: " user was added successfully"});
   } catch (error) {
        throw error;
   } 

}

module.exports = {
    addCustomerDetails
}