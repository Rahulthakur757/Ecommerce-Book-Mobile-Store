
const Admin = require('./models/Admin');
async function MakeAdmin() {
    try {
        let adminExits = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
        if (adminExits) {
            console.log('Admin Updated...');
        } else {
            let admin = new Admin();
            admin.firstName = 'Rahul';
            admin.lastName = 'thakur';
            admin.email = process.env.ADMIN_EMAIL;
            admin.password = process.env.ADMIN_PASSWORD;
            await admin.save();
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = MakeAdmin;