const Book = require('../models/Books');
const Author = require('../models/Author');


module.exports.getAuthors = function(req, res) {
    Author.find().populate('written_books').exec((err, author)=>{
        res.status(200).send(author);
    })
}

module.exports.addAuthor = function(req, res) {
    let authorData = req.body;
    let author = new Author(authorData);
    
        Book.find({_id: author.written_books}, (err, books)=>{
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
}

module.exports.updateAuthor = async function(req, res) {
    let updatedAuthorId = req.params.id;
    let updatedAuthor = req.body;

    let written_books = [];
    for(let book of updatedAuthor.written_books) {
        written_books.push(book._id)
    }
    updatedAuthor.written_books = written_books;

    await Author.findById({_id: updatedAuthorId}, async (err, oldAuthor)=>{
        
        await Book.updateMany({author: oldAuthor._id}, {$pull: {
            author: oldAuthor._id
        }}, (err, done)=>{
            if(err) res.status(400).send(err);
        })
        
        Book.updateMany({_id: updatedAuthor.written_books}, {$push: {
            author: updatedAuthorId
        }},(err, done)=>{
            if(err) res.status(400).send(err);
        })

    })

    Author.updateOne({_id: updatedAuthorId}, updatedAuthor, (err, done)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(done);
    })
}

module.exports.deleteAuthor = function(req, res) {
    let authorId = req.params.id;
    Book.updateMany({author: authorId}, {$pull: {
        author: authorId
    }}, (err, done)=>{
        if(err) console.log(err);
    })
    Author.findByIdAndRemove(authorId, (err, done)=>{
        res.status(200).send(done);
    })
}