// models/Book.js
const mongoose = require('mongoose');

const allowedGenres = ["Fiction", "Science", "History", "Technology", "Biography", "Comics"];

const BookSchema = new mongoose.Schema({
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

// Create index for bookID uniqueness (helps enforce unique constraint)
BookSchema.index({ bookID: 1 }, { unique: true });

module.exports = mongoose.model('Book', BookSchema);
