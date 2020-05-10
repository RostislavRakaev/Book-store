const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = 'mongodb+srv://mainless:12345678milk@cluster0-gddgz.mongodb.net/test?retryWrites=true&w=majority';

const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const authorController = require('../controllers/authorController');
const couponController = require('../controllers/couponsController');
const searchController = require('../controllers/searchController');

const auth = require('../middleware/auth');

mongoose.connect(db, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, err=>{
    if(err) {
        console.error('Error ' + err);
    }
    else {
        console.log('connected to mongo db');
    }
})

router.get('/', (req, res)=>{
    res.send('From Api rounder');
});

router.get('/search', searchController.searcher);

////////Books/////////

router.get('/books', bookController.getBooks);
router.post('/books', bookController.addBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

//Users, registration/login

router.get('/users', auth.checkTokenForAdmin, userController.getUsers);
router.put('/users/:id', userController.updateUser);

router.post('/users', userController.register);
router.post('/login', userController.login);

router.get('/users/:id/books', userController.getUsersPurchasedBooks);
router.put('/users/:id/books', userController.purchaseBook);

//Author

router.get('/authors', authorController.getAuthors);
router.post('/authors', authorController.addAuthor);
router.put('/authors/:id', authorController.updateAuthor);
router.delete('/authors/:id', authorController.deleteAuthor);

//Coupons

router.get('/coupons', couponController.getCoupons);
router.post('/coupons', couponController.addCoupon);
router.delete('/coupons/:id', couponController.deleteCoupon);

router.get('/coupons-check', couponController.checkIfCouponIsValid);

module.exports = router;

