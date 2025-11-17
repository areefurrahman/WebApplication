const mongoose = require('mongoose')

const Bookschema = new mongoose.Schema({
   bookID: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  author: {                 // note spelling 'author'
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: allowedGenres
  },
  publishedYear: {
    type: Number,
    required: true,
    min: 1900
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Bookschema.index({ bookID: 1 }, { unique: true });


// const Book = mogoose.model('Book', Bookschema, 'book')
// module.exports = Book;

module.exports = mongoose.model('Book', Bookschema)