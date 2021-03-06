const MiniSearch = require('minisearch');

const Book = require('../models/Books');
const Author = require('../models/Author');

module.exports.searcher = function(req, res) {

    function search(value, db, index, whoToPopulate,  ...returnData) {
        
        let miniSearch = new MiniSearch({
            fields: [index, 'text'], // fields to index for full-text search
            storeFields: returnData // fields to return with search results
            });

        db.find().populate(whoToPopulate).exec((err, match)=>{
            if(err) console.log(err)
            miniSearch.addAll(match);
            let results = miniSearch.search(value);
            res.send(results);
            })

    }

    const title = req.query.title;
    const author = req.query.author;
    
    if(title) {
        search(title, Book, 'title', 'author', 'title', 'price', 'image_url', 'author', 'description', '_id', 'purchased_copies', 'genre', 'quantity', 'language', 'published');
    }

    else if(author) {
        search(author, Author, 'name', 'written_books', 'name', '_id');
    }


}


