const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CouponSchema = new Schema({
    name: {
        type: String,
    },
    discount: {
        type: Number,
        required: true
    },
    dateOfImplementation: {
        type: Date,
        required: true
    },
    dateOfExpiration: {
        type: Date,
        required: true
    },
    whoIssued: {
        type: Schema.Types.ObjectId, ref: 'users'
    }
})

module.exports = Coupon = mongoose.model('coupons', CouponSchema)