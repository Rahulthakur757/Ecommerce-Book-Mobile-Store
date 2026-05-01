const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const ProductDeliveryPlaceSchema = new Schema({

    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    mobile: { type: mongoose.Schema.Types.ObjectId, ref: 'Mobile'},
    pinCode: { type: String, required: true },
    city: {type: String},
    isAvailable: {type: Boolean, default: false, enum: [true, false]},
    deliveryTime: {type: String},
    deliveryCharges: {type: Number, default: 0 },
    status: { type: String, default: 'Active', enum: ['Active', 'Disabled']},
    updatedAt: Date,
    createdAt: Date 
    
});
ProductDeliveryPlaceSchema.plugin( timestamps, { index: true });
module.exports = mongoose.model('ProductDeliveryPlace', ProductDeliveryPlaceSchema);