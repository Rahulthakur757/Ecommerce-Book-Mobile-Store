const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const adminSchema = new Schema({

    firstName: { type: String, required: true},
    lastName: { type: String, default: '' },
    email: {type: String, unique: true, required: true },
    password: { type: String, default: '' },
    mobileNo: { type: String, default: '' },
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    status: { type: String, default: 'Active', enum: ['Active', 'Disabled']},
    updatedAt: Date,
    createdAt: Date 
    
})
adminSchema.plugin( timestamps, { index: true });
module.exports = mongoose.model('Account', adminSchema);