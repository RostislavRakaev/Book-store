const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Book = require('../models/Books');

const JWT_secret = 'some_secret_jwt'

module.exports.getUsers = function(req, res) {
    User.find().populate('books').exec((err, user)=>{
        res.status(200).send(user);
    })
}

module.exports.getUsersPurchasedBooks = function(req, res) {
    let usersId = req.params.id;
    User.findById(usersId).populate('books').exec((err, response)=>{
        res.send(response.books);
    })
}

module.exports.purchaseBook = function(req, res) {
    let purchasedBook = req.body;
    let userId = req.params.id;

        //Adds book/s to cus

        User.findByIdAndUpdate(userId, {$push: {
            books: purchasedBook
        }}, (err, user)=>{
            if(err) console.log(err)
            //When cus buys a book it reduces the quantity of a purchased book

            Book.findByIdAndUpdate(
                purchasedBook,
                {$inc: {
                quantity: -1,
                purchased_copies: +1
                }},
                {returnNewDocument: true},
                (error, result)=>{
                    if(!error) res.send('payment went through')
                }
            )
        })
}

module.exports.register = function(req, res) {
    if(req.body) {
        let userData = req.body;

    
        User.findOne({email: userData.email}, (error, match)=>{
            if(!match) {
                
                bcrypt.hash(userData.password, 10, (err, hashedPassword)=>{
                    userData.password = hashedPassword;
                    let user = new User(userData);
                    return user.save((err, registeredUser)=>{
                        res.status(200).send(registeredUser)
                    })
                })

            }
            else {
                return res.status(403).send(null)
            }
        })
    }
    else {
        res.send({error: 'empty fields'})
    }
}

module.exports.updateUser = function(req, res) {
    let userId = req.params.id;
    let updatedUser = req.body;
    
    User.updateOne({_id: userId}, updatedUser, (err, done)=>{
        res.status(200).send(done);
    })
}

module.exports.login = function(req, res) {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, match)=>{

            if(!match) {
                res.status(401).send('Invalid email');
            }
            else {
                bcrypt.compare(userData.password, match.password, (err, matchOfPasswords)=>{
                    if(matchOfPasswords) { 
                        jwt.sign(
                        {
                            _id: match._id, 
                            role: match.role, 
                            name: `${match.first_name} ${match.last_name}`,
                            email: match.email
                        },
                        JWT_secret, { expiresIn: 10012016 }, (err, token)=>{
                            res.status(200).send({token: token});
                        });
                    }
                    else {
                        res.status(401).send('Invalid password');
                    }
                })
            }
    })
}

