const Coupon = require('../models/Coupon');

module.exports.getCoupons = function(req, res) {
    Coupon.find().populate('who_issued').exec((err, coupons)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(coupons);
    })
}

module.exports.checkIfCouponIsValid = function(req, res) {
    const coupon = req.query.code;

    Coupon.findOne({code: coupon}, (err, match)=>{
            
        if(!match) {
            res.status(400).send(null)
        }
        else {
            let timeNow = Date.now();

            if(timeNow < match.date_of_expiration) {
                res.status(200).send(match);
            }
            else {
                res.status(400).send(null)
            }
        }
    })
}

module.exports.addCoupon = function(req, res) {
    let coupon = req.body;
    let newCoupon = new Coupon(coupon);

    Coupon.findOne({code: newCoupon.code}, (err, match)=>{
        if(!match) {
            newCoupon.save((err, done)=>{
                if(err) console.log(err);
                res.status(200).send(done);
            })
        }
    })
}

module.exports.deleteCoupon = function(req, res) {
    let couponId = req.params.id;
    
    Coupon.findByIdAndRemove(couponId, (err, done)=>{
        res.status(200).send(done);
    })
}