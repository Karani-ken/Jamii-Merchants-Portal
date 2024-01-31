const dbHandler = require('../Database/dbHandler')
const addCustomerDetails = async (req, res) =>{
   try {
    const {name, id_photo, email, phone, paymentCode} = req.body;
    if(!name || !id_photo || !email || !phone || !paymentCode){
        res.status(400).json({message: "all fields are required"})
    }
    const customerData = {
        name,
        id_photo,
        email,
        phone,
        paymentCode
    }
    await dbHandler.insertCustomerDetails(customerData);
    res.status(201).json({message: " customer was added successfully"});
   } catch (error) {
        throw error;
   }     

}
const deleteCustomer = async (req, res) =>{
    try {
        const {email} = req.body;
        await dbHandler.deleteCustomerDetails(email);
        res.status(200).json({message: "customer details were deleted"});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addCustomerDetails,
    deleteCustomer
}