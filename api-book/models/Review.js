const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId,ref: 'Book',  required: true },
    mobileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mobile',required: true},
    comment: { type: String, required: true },
    rating: { type: Number},
    status: { type: String, default: 'Active', enum: ['Active', 'Disabled']},
    updatedAt: Date,
    createdAt: Date 
    
});
reviewSchema.plugin( timestamps, { index: true });
module.exports = mongoose.model('Review', reviewSchema);