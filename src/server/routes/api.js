const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MiniSearch = require('minisearch')

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
        console.log('connected to mongo db');
    }
})


router.get('/', (req, res)=>{
    res.send('From Api rounder');
});

////////Books/////////

router.get('/books', (req,res)=>{
    Books.find().populate('author').exec((err, books)=>{
            res.send(books);
         });
    Books.watch
});

router.post('/books', (req, res)=>{
    let book = req.body;
    
    let authors = [];
    for(let author of book.author) {
        authors.push(author._id)
    }
    book.author = authors;

    let newBook = new Books(book);

    Author.updateMany({_id: newBook.author}, {$push: {
        written_books: newBook._id
    }}, (err, done)=>{
        if(err) res.status(400).send(err);
    })

    newBook.save((err, done)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(done);
    })

}
)

router.put('/books/:id', async (req, res)=>{
    let updatedBookId = req.params.id;
    let updatedBook = req.body;    
    
    updatedAuthors = [];
    for(let author of updatedBook.author) {
        updatedAuthors.push(author._id);
    }
    updatedBook.author = updatedAuthors;
    
    await Books.findById(updatedBook, async (err, oldBook)=>{

        await Author.updateMany({_id: oldBook.author}, {$pull: {
            written_books: oldBook._id
        }}, (err, done)=>{
            if(err) res.status(404).send(err);
        })

        Author.updateMany({_id: updatedBook.author}, {$push: {
            written_books: updatedBookId
        }}, (err, done)=>{
            if(err) res.status(404).send(err);
        })

    }) 

    Books.updateOne({_id: updatedBookId}, updatedBook, (err, done)=>{
        if(err) res.status(404).send(err);
        res.status(200).send(done);
    })


})

router.delete('/books/:id', (req, res)=>{
    let bookId = req.params.id;
    Author.updateMany({written_books: bookId}, {$pull: {
        written_books: bookId
    }}, (err, author)=>{
        console.log(author);
    })
    Books.findByIdAndDelete(bookId, (err, done)=>{})
})



router.get('/search', (req, res)=>{

     function searcher(value, db, index) {
        let miniSearch = new MiniSearch({
            fields: [index, 'text'], // fields to index for full-text search
            storeFields: [index, '_id'] // fields to return with search results
          });

        db.find((err, match)=>{
            miniSearch.addAll(match);
            let results = miniSearch.search(value);
            res.send(results);
          })
    }

    let title = req.query.title;
    let author = req.query.author;
    let book = req.query.book;

    if(title) {
        searcher(title, Books, 'title');

    }
    else if(author) {
        searcher(author, Author, 'name');
    }
    else if(book) {
        searcher(book, Books, 'title');
    }



})


/////registration//////

router.get('/users', (req, res)=>{
    User.find((err, user)=>{
        res.send(user);
    })
})

//Registration

router.post('/users',  (req, res)=>{
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
})

router.get('/users/:id/books', (req, res)=>{
    let usersId = req.params.id;
    User.findById(usersId).populate('books').exec((err, response)=>{
        res.send(response.books);
    })
})

router.post('/users/:id/books', (req, res)=>{
    let purchasedBook = req.body;
    let userId = req.params.id;

        
        //Adds book/s to cus

        User.findByIdAndUpdate(userId, {$push: {
            books: purchasedBook
        }}, (err, user)=>{
            if(err) console.log(err)
            //When cus buys a book it reduces the quantity of a purchased book

            Books.findByIdAndUpdate(
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


})
/////////// Login ////////////////

router.post('/login', (req, res)=>{
    let userData = req.body;
    User.findOne({email: userData.email}, (err, match)=>{

            if(!match) {
                res.status(401).send('Invalid email')
            }
            else {
                bcrypt.compare(userData.password, match.password, (err, matchOfPasswords)=>{
                    if(matchOfPasswords) { 
                        let token = jwt.sign(
                        {
                            _id: match._id, 
                            role: match.role, 
                            name: `${match.first_name} ${match.last_name}`,
                            email: match.email
                        },
                        JWT_secret, { expiresIn: 10012016 });
                        res.status(200).send({
                            token: token
                           } 
                        )
                    }
                    else {
                        res.status(401).send('Invalid password');
                    }
                })
            }
    })
})

//Author

    router.get('/authors', (req, res)=>{
        Author.find().populate('written_books').exec((err, author)=>{
            res.status(200).send(author);
        })
    })

    //adds author

    router.post('/authors', (req, res)=>{
        let authorData = req.body;
        let author = new Author(authorData);
        
            Books.find({_id: author.written_books}, (err, books)=>{
                for(let book of books) {
                    if(!book.author.includes(author._id)) {
                        Books.findByIdAndUpdate(book._id, {$push: {
                            author: author._id
                        }}, (err, result)=>{
                        })
                    }
                }
            })
        
        author.save((err, addedAuthor)=>{
            if(err) console.log(err);
            res.status(200).send(addedAuthor);
        })
    })

    router.put('/authors/:id', async (req, res)=>{
        let updatedAuthorId = req.params.id;
        let updatedAuthor = req.body;

        let written_books = [];
        for(let book of updatedAuthor.written_books) {
            written_books.push(book._id)
        }
        updatedAuthor.written_books = written_books;

        await Author.findById({_id: updatedAuthorId}, async (err, oldAuthor)=>{
            
            await Books.updateMany({author: oldAuthor._id}, {$pull: {
                author: oldAuthor._id
            }}, (err, done)=>{
                if(err) res.status(400).send(err);
            })
            
            Books.updateMany({_id: updatedAuthor.written_books}, {$push: {
                author: updatedAuthorId
            }},(err, done)=>{
                if(err) res.status(400).send(err);
            })

        })

        Author.updateOne({_id: updatedAuthorId}, updatedAuthor, (err, done)=>{
            if(err) res.status(400).send(err);
            res.status(200).send(done);
        })
})





    router.delete('/authors/:id', (req, res)=>{
        let authorId = req.params.id;
        Books.updateMany({author: authorId}, {$pull: {
            author: authorId
        }}, (err, done)=>{
            if(err) console.log(err);
        })
        Author.findByIdAndRemove(authorId, (err, done)=>{
            res.status(200).send(done);
        })
    })

    router.get('/authors/:id/writtenbooks', (req, res)=>{
        let authorId = req.params.id;

        Author.findById(authorId).populate('written_books').exec((err, response)=>{
            res.status(200).send(response.written_books);
        })
    })

    //Adds written books to author

    router.put('/authors/:id/writtenbooks', (req, res)=>{
        let authorId = req.params.id;
        let books = req.body.books;

            Author.findByIdAndUpdate(authorId, {$push: {
                written_books: books
            }}, (err, response)=>{
                res.status(200).send(response);
            })

            
    })

module.exports = router;