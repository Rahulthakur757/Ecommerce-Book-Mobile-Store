const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const couponSchema = new Schema({

})
couponSchema.plugin( timestamps, { index: true });
module.exports = mongoose.model('Coupons', couponSchema);