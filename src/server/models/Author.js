const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    country: {
        type: String,
        required: true
    },
    written_books: [{
        type: Schema.Types.ObjectId, ref: 'books'
    }]
})

module.exports = Author = mongoose.model('authors', AuthorSchema, 'authors')