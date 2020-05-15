const paginate = require('jw-paginate');

const Book = require('../models/Books');
const Author = require('../models/Author');

module.exports.getBooks = function(req, res) {
    Book.find().populate('author').exec((err, books)=>{
        res.status(200).json(books);
     });
}

module.exports.getPaginatedBooks = function(req, res) {
    Book.find().populate('author').exec((err, books)=>{
        const page = parseInt(req.query.page) || 1;
        const pageSize = 9;

        const pager = paginate(books.length, page, pageSize);

        const pageOfItems = books.slice(pager.startIndex, pager.endIndex + 1);
        res.status(200).json({ pager, pageOfItems });
    })
}

module.exports.addBook = function(req, res) {
    let book = req.body;
    
    let authors = [];
    for(let author of book.author) {
        authors.push(author._id)
    }
    book.author = authors;

    let newBook = new Book(book);
    
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

module.exports.updateBook = async function(req, res) {

    let updatedBookId = req.params.id;
    let updatedBook = req.body;    
    
    updatedAuthors = [];
    for(let author of updatedBook.author) {
        updatedAuthors.push(author._id);
    }
    updatedBook.author = updatedAuthors;
    
    await Book.findById(updatedBook, async (err, oldBook)=>{

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

    Book.updateOne({_id: updatedBookId}, updatedBook, (err, done)=>{
        if(err) res.status(404).send(err);
        res.status(200).send(done);
    })
}

module.exports.deleteBook = function(req, res) {
    let bookId = req.params.id;
    Author.updateMany({written_books: bookId}, {$pull: {
        written_books: bookId
    }}, (err, author)=>{
        console.log(author);
    })
    Book.findByIdAndDelete(bookId, (err, done)=>{})
}
