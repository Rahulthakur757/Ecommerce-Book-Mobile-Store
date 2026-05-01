const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, default:'' },
    email: {type: String, required: true },
    mobileNo: { type: String, required: true },
    addressLine1: {type: String, required: true},
    addressLine2: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipCode: {type: String, required: true},
    transactionId: {type: String, required: true},
    totalPrice: {type: Number, default: 0},
    paymentgateway: {type: String,default:'Stripe', enum:['Stripe','RazorPay']},
    status: { type: String, default: 'Pending', enum: ['Pending', 'Completed','Rejected']},
    products: {type: JSON, default: []},
    updatedAt: Date,
    createdAt: Date 
    
})
transactionSchema.plugin( timestamps, { index: true });
module.exports = mongoose.model('Transaction', transactionSchema);