const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const db = 'mongodb+srv://mainless:12345678milk@cluster0-gddgz.mongodb.net/test?retryWrites=true&w=majority';
const JWT_secret = 'some_secret_jwt'

const User = require('../models/USER');
const Books = require('../models/Books');
const Author = require('../models/Author');


mongoose.connect(db, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, err=>{
    if(err) {
        console.error('Error ' + err);
    }
    else {
        console.log('connected to mongo db')
    }
})


router.get('/', (req, res)=>{
    res.send('From Api rounder');

});

////////Books/////////

router.get('/books', (req,res)=>{
    Books.find((err, books)=>{
        res.send(books)
    });
});

router.get('/books/:id', (req,res)=>{
    Books.findById(req.params.id, (err, books)=>{
        if(!books) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', books:books });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    })
})

router.get('/authors', (req, res)=>{
    Author.find((err, authors)=>{
        res.send(authors)
    })
})

/////registration//////

router.get('/users', (req, res)=>{
    User.find((err, user)=>{
        res.send(user);
    })
})

router.post('/users',  (req, res)=>{
    if(req.body) {
        let userData = req.body;
        let user = new User(userData);
    
        User.findOne({email: userData.email}, (error, match)=>{
            if(!match) {
                user.save((err, registeredUser)=>{
                    if(err) {
                        console.log(err)
                    }
                    res.status(200).send(registeredUser)
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
})

router.get('/users/:id/books', (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        res.send(user)
    })
})
router.post('/users/:id/books', (req, res)=>{
    let purchasedBook = req.body.books;

    for(let i = 0; i < purchasedBook.length; i++) {
        
        User.findByIdAndUpdate(req.params.id, {$push: {
            books: purchasedBook[i]
        }}, (err, user)=>{

            //When cus buys a book it reduces the quantity

            Books.findOneAndUpdate(
                {_id: purchasedBook[i]},
                {$inc: {quantity: -1}},
                {returnNewDocument: true},
                (err, result)=>{
                    console.log(result)
                }
            )
        })
    }

})
/////////// Login ////////////////

router.post('/login', (req, res)=>{
    let userData = req.body;
    const expiration = '5m';
    User.findOne({email: userData.email}, (err, match)=>{
        if(err) {
            console.log(err);
        }
        else {
            if(!match) {
                res.status(401).send('Invalid email')
            }
            else {
                let token = jwt.sign(userData, JWT_secret, { expiresIn: expiration })
                if(match.password !== userData.password) {
                    res.status(401).send('Invalid password')
                }
                else {
                    res.status(200).send({
                        signed_user: match,
                        token: token
                       } 
                    )
                }
            }
        }
    })
})

module.exports = router;