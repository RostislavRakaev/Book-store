const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/USER');
const Books = require('../models/Books');
const db = 'mongodb+srv://mainless:12345678milk@cluster0-gddgz.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db, err=>{
    if(err) {
        console.error('Error ' + err);
    }
    else {
        console.log('connected to mongo db')
    }
})


router.get('/', (req, res)=>{
    res.send('From Api rounder');

    async function newBook() {
        let marvin = await new Books({
            title: 'Marvin',
            language: 'some'
        });

        marvin.save()
        console.log('new Book added');

        let user1 = await new User({
            first_name: 'Alex',
            books: marvin._id
        });

        user1.save(err=>{
            if(err) {
                console.log(err)
            }
        })
    }

    newBook();
});

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

router.get('/register', (req, res)=>{
    User.find((err, user)=>{
        res.send(user);
    })
})

router.post('/register',  (req, res)=>{
    let userData =  req.body;
    let user =  new User(userData);
    user.save((error, registeredUser)=>{
        if(error) {
            console.log(error);
        }
        else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login', (req, res)=>{
    let userData = req.body;
    
    User.findOne({email: userData.email}, (err, match)=>{
        if(err) {
            console.log(err);
        }
        else {
            if(!match) {
                res.status(401).send('Invalid email')
            }
            else {
                if(match.password !== userData.password) {
                    res.status(401).send('Invalid password')
                }
                else {
                    res.status(200).send(match)
                }
            }
        }
    })
})

module.exports = router;