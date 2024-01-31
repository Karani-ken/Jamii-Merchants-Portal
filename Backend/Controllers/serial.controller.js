const dbHandler = require('../Database/dbHandler')
const addSerial = async (req, res) =>{
    try {
        const {serial_no, user_id} = req.body;
        const serialData = {
            serial_no,
            user_id
        }
        await dbHandler.addSerial(serialData);
        res.status(201).json({message: "a new serial was added"});
    } catch (error) {
        throw error;
    }
}

module.exports = {addSerial}