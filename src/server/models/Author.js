const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date
    },
    writtenBooks: [{
        type: Schema.Types.ObjectId, ref: 'books'
    }]
})

module.exports = Author = mongoose.model('authors', AuthorSchema)