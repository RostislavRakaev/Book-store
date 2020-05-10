const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CouponSchema = new Schema({
    code: {
        type: String,
    },
    discount: {
        type: Number,
        required: true
    },
    date_of_implementation: {
        type: Number,
        required: true
    },
    date_of_expiration: {
        type: Number,
        required: true
    },
    who_issued: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    used: {
        type: Number,
        default: 0
    }
})

module.exports = Coupon = mongoose.model('coupons', CouponSchema)