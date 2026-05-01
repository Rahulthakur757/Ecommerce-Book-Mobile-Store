const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Db connected....");
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = connect