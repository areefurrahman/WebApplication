# Library Management System API (Assignment 3)

This project is a beginner-friendly Node.js and Express-based REST API
for a Library Management System using MongoDB and Passport Local authentication.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (Local Strategy)
- bcrypt
- body-parser
- nodemon

---

## Project Structure

library-auth-api/
│
├── index.js
├── db.js
├── package.json
│
├── models/
│ ├── person.js
│ └── book.js
│
├── routes/
│ ├── authRoutes.js
│ └── bookRoutes.js
│
└── config/
└── passport.js


---

## 🔌 Database Setup

Make sure MongoDB is running locally.

Database used:


libraryDB


Connection file:


db.js


---

## 🚀 How to Run the Project

1. Install dependencies


npm install


2. Start the server


npm start


3. Server runs on:


http://localhost:3000


---

## 👤 Authentication APIs

### 🔹 Register User
**POST** `/register`

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

🔹 Login User

POST /login

{
  "username": "john_doe",
  "password": "password123"
}

📚 Book APIs
🔹 Add Book

POST /books

{
  "title": "Node.js Guide",
  "author": "John Smith",
  "isbn": "111222333"
}

🔹 Get All Books

GET /books


