const express = require("express"); // Import Express.js
const books = require("./data"); // Import static book data
const app = express(); // Create an Express application
const PORT = 3000; // Define a port for our server


app.use(express.json());

// 1. GET /api/books - Retrieve all books
app.get("/api/books", (req, res) => {
  res.json({
    success: true,
    message: "List of all books in the library",
    data: books
  });
});

// 2. GET /api/books/available - Retrieve all available books
app.get("/api/books/available", (req, res) => {
  const availableBooks = books.filter(book => book.is_available === true);
  res.json({
    success: true,
    message: "List of available books",
    data: availableBooks
  });
});

// 3. GET /api/books/issued - Retrieve all issued books
app.get("/api/books/issued", (req, res) => {
  const issuedBooks = books.filter(book => book.is_available === false);
  res.json({
    success: true,
    message: "List of issued books",
    data: issuedBooks
  });
});

// 4. GET /api/books?author=AuthorName - Filter books by author
// Example: /api/books?author=James Clear
app.get("/api/books", (req, res) => {
  const authorName = req.query.author;
  
  // If no author query provided, return all books
  if (!authorName) {
    return res.json({
      success: true,
      message: "List of all books",
      data: books
    });
  }

  // Filter books by author (case insensitive)
  const authorBooks = books.filter(
    book => book.author.toLowerCase() === authorName.toLowerCase()
  );

  if (authorBooks.length === 0) {
    return res.json({
      success: false,
      message: `No books found by author: ${authorName}`
    });
  }

  res.json({
    success: true,
    message: `Books by author: ${authorName}`,
    data: authorBooks
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Use Ctrl+C to stop the server");
});
