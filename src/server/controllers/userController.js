const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Book = require('../models/Books');

const JWT_secret = 'some_secret_jwt'

module.exports.getUsers = (req, res) => {
  User.find().populate({
    path: 'books',
    populate: {
      path: 'author'
    }
  }).exec((err, user) => {
    res.status(200).json(user);
  })
}

module.exports.getUsersPurchasedBooks = (req, res) => {
  let usersId = req.params.id;
  User.findById(usersId).populate('books').exec((err, response) => {
    res.status(200).json(response.books);
  })
}

module.exports.purchaseBook = async (req, res) => {
  let purchasedBook = req.body;
  let userId = req.params.id;

  //Adds book/s to cus

  User.findByIdAndUpdate(userId, {
    $push: {
      books: purchasedBook
    }
  }, (error, user) => { });

  Book.findByIdAndUpdate(
    purchasedBook,
    {
      $inc: {
        quantity: -1,
        purchased_copies: +1
      }
    },
    { returnNewDocument: true },
    (error, result) => {
      if (!error) res.status(200).json(result);
    }
  )
}

module.exports.register = (req, res) => {
  if (req.body) {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, match) => {
      if (!match) {
        bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
          userData.password = hashedPassword;
          let user = new User(userData);
          user.save((err, registeredUser) => {
            res.status(200).json(registeredUser)
          })
        })

      }
      else res.status(403).send(null);
    })
  }
  else res.send({ error: 'empty fields' });
}

module.exports.updateUser = (req, res) => {
  let userId = req.params.id;
  let updatedUser = req.body;

  User.updateOne({ _id: userId }, updatedUser, (err, done) => {
    res.status(200).json(done);
  })
}

module.exports.login = function (req, res) {
  let userData = req.body;
  User.findOne({ email: userData.email }, (err, match) => {

    if (!match) res.status(401).send('Invalid email');
    else {
      bcrypt.compare(userData.password, match.password, (err, matchOfPasswords) => {
        if (matchOfPasswords) {
          jwt.sign(
            {
              _id: match._id,
              role: match.role,
              name: `${match.first_name} ${match.last_name}`,
              email: match.email
            },
            JWT_secret, { expiresIn: 10012016 }, (err, token) => {
              res.status(200).json({ token: token });
            });
        }
        else res.status(401).send('Invalid password');
      })
    }
  })
}

