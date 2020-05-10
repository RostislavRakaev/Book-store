const MiniSearch = require('minisearch');

const User = require('../models/User');
const Books = require('../models/Books');
const Author = require('../models/Author');

module.exports.searcher = function(req, res) {

    function search(value, db, index) {
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

    if(title) {
        search(title, Books, 'title');

    }
    else if(author) {
        search(author, Author, 'name');
    }

}


