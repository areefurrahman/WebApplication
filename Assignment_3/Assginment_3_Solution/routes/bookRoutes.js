const express = require('express');
const passport = require('passport');
const Book = require('../models/book');

const router = express.Router();

/* GET ALL BOOKS (Public) */
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ADD BOOK (Protected) */
router.post(
  '/books',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    try {
      const { title, author, isbn } = req.body;

      if (!title || !author || !isbn) {
        return res.status(400).json({ message: 'All fields required' });
      }

      const book = new Book({ title, author, isbn });
      await book.save();

      res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
