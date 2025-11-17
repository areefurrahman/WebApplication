// server.js
// Main server file for LMS API
// Implements endpoints described in the assignment

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


require('./connection');


const Member = require('./Models/Member');
const Book = require('./Models/Book');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API is running' });
});

/*
  1) POST /lms/books --> Add a new book
  Expected JSON body:
  {
    "bookID": 101,
    "title": "Node.js Basics",
    "author": "Alice",
    "genre": "Technology",
    "publishedYear": 2022,
    "isAvailable": true
  }
*/
app.post('/lms/books', async (req, res) => {
  try {
    const { bookID, title, author, genre, publishedYear, isAvailable } = req.body;

    // Simple required fields check
    if (!bookID || !title || !author || !genre || !publishedYear) {
      return res.status(400).json({ error: 'Missing required fields: bookID, title, author, genre, publishedYear' });
    }

    const newBook = new Book({
      bookID,
      title,
      author,
      genre,
      publishedYear,
      isAvailable // if undefined, default true will apply
    });

    const saved = await newBook.save();
    return res.status(201).json({ message: 'Book added', book: saved });
  } catch (err) {
    // Handle duplicate key error gracefully
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate key error: bookID or another unique field already exists', details: err.keyValue });
    }
    console.error('Error in POST /lms/books:', err);
    return res.status(500).json({ error: 'Server error while adding book' });
  }
});

/*
  2) POST /lms/members --> Add a new member
  Expected JSON:
  {
    "memberID": 201,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "CS",
    "role": "student",
    "gender": "male"
  }
*/


app.post('/lms/members', async (req, res) => {
  try {
    const { memberID, name, email, department, role, gender } = req.body;

    if (!memberID || !name || !email || !role) {
      return res.status(400).json({ error: 'Missing required fields: memberID, name, email, role' });
    }

    const newMember = new Member({
      memberID,
      name,
      email,
      department,
      role,
      gender
    });

    const saved = await newMember.save();
    return res.status(201).json({ message: 'Member added', member: saved });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate key error: memberID or email already exists', details: err.keyValue });
    }
    console.error('Error in POST /lms/members:', err);
    return res.status(500).json({ error: 'Server error while adding member' });
  }
});

/*
  3) GET /lms/books --> Fetch all books
*/
app.get('/lms/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({ count: books.length, books });
  } catch (err) {
    console.error('Error in GET /lms/books:', err);
    return res.status(500).json({ error: 'Server error while fetching books' });
  }
});

/*
  4) GET /lms/members --> Fetch all members
*/
app.get('/lms/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ joinedDate: -1 });
    return res.status(200).json({ count: members.length, members });
  } catch (err) {
    console.error('Error in GET /lms/members:', err);
    return res.status(500).json({ error: 'Server error while fetching members' });
  }
});

/*
  5) GET /lms/books/available --> Fetch only books that are available
*/
app.get('/lms/books/available', async (req, res) => {
  try {
    // Allow optional query filtering with genre and publishedYear (see endpoint #10)
    const filter = { isAvailable: true };

    if (req.query.genre) {
      filter.genre = req.query.genre;
    }
    if (req.query.publishedYear) {
      // publishedYear might be sent as string; convert to number
      const year = Number(req.query.publishedYear);
      if (!Number.isNaN(year)) filter.publishedYear = year;
    }

    const books = await Book.find(filter);
    return res.status(200).json({ count: books.length, books });
  } catch (err) {
    console.error('Error in GET /lms/books/available:', err);
    return res.status(500).json({ error: 'Server error while fetching available books' });
  }
});

/*
  6) GET /lms/books/issued --> Fetch the names (titles) of books that are already issued.
     Assumption: Books with isAvailable=false are considered issued.
     Returns array of titles (and optionally other info).
*/
app.get('/lms/books/issued', async (req, res) => {
  try {
    const issuedBooks = await Book.find({ isAvailable: false }, { title: 1, bookID: 1, _id: 0 });
    // Map to titles only if user asked for names; but return bookID too for clarity
    return res.status(200).json({ count: issuedBooks.length, issuedBooks });
  } catch (err) {
    console.error('Error in GET /lms/books/issued:', err);
    return res.status(500).json({ error: 'Server error while fetching issued books' });
  }
});

/*
  7) GET /lms/books/genre/:type --> Fetch all books of a specific genre
*/
app.get('/lms/books/genre/:type', async (req, res) => {
  try {
    const genreType = req.params.type;
    const books = await Book.find({ genre: genreType });
    if (!books || books.length === 0) {
      return res.status(404).json({ message: `No books found for genre: ${genreType}` });
    }
    return res.status(200).json({ count: books.length, books });
  } catch (err) {
    console.error('Error in GET /lms/books/genre/:type:', err);
    return res.status(500).json({ error: 'Server error while fetching books by genre' });
  }
});

/*
  8) GET /lms/members/recent --> Fetch members who joined in the last 60 days
*/
app.get('/lms/members/recent', async (req, res) => {
  try {
    const now = new Date();
    const past60 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // 60 days ago
    const members = await Member.find({ joinedDate: { $gte: past60 } }).sort({ joinedDate: -1 });
    return res.status(200).json({ count: members.length, members });
  } catch (err) {
    console.error('Error in GET /lms/members/recent:', err);
    return res.status(500).json({ error: 'Server error while fetching recent members' });
  }
});

/*
  9) GET /LMS/members/role/:role  AND  GET /lms/members/role/:role
     Fetch all members of a specific role (student or faculty)
     Note: Implemented both paths to match assignment text which used uppercase in one place.
*/
async function handleMembersByRole(req, res) {
  try {
    const role = req.params.role;
    if (!role) return res.status(400).json({ error: 'Role parameter is required' });

    const members = await Member.find({ role: role });
    if (!members || members.length === 0) {
      return res.status(404).json({ message: `No members found with role: ${role}` });
    }
    return res.status(200).json({ count: members.length, members });
  } catch (err) {
    console.error('Error in GET /lms/LMS members role:', err);
    return res.status(500).json({ error: 'Server error while fetching members by role' });
  }
}

app.get('/LMS/members/role/:role', handleMembersByRole);
app.get('/lms/members/role/:role', handleMembersByRole);

/*
  10) GET /lms/books/available?genre=Science&publishedYear=2022
  This is handled by the /lms/books/available route above (it looks at query parameters).
  Example usage:
    /lms/books/available?genre=Science
    /lms/books/available?publishedYear=2022
    /lms/books/available?genre=Science&publishedYear=2022
*/

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
