const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type:String
    },
    description: {
        type:String
    },
    language: {
        type:String
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'Author'
    },
    price: {
        type:Number
    },
    image_url: {
        type:String
    },
    genre: {
        type:String
    },
    published: {
        type:Date
    },
    quantity: {
        type:Number
    }
});

module.exports = Books = mongoose.model('books', BookSchema)