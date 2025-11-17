# Library Management System API  
**Course Code:** SESE3143  
**Assignment 02 — Web Application Development (Fall 2025)**  
**Student:** Areef ur Rahman  
**Registration No:** L2F23BSSE0389  
**Section:** [Your Section]  

---

## Objective  
Design and develop a **RESTful API** for a **Library Management System (LMS)** using  
**Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

This API allows managing **Books** and **Members** records — adding, viewing, and filtering data.

---

## Technologies Used
- Node.js  
- Express.js  
- MongoDB  
- Mongoose (ODM library)  
- Body-Parser (for reading JSON data)  
- Nodemon (optional for auto-restart during development)

---

## Project Structure
```
LMS-API/
│
├── db.js                  # MongoDB connection setup
├── index.js              # Main API index file with all routes
├── package.json           # Project configuration & dependencies
│
└── models/
    ├── Book.js            # Book schema
    └── Member.js          # Member schema
```

---

## Setup Instructions

### 1. Install Dependencies
Make sure you have **Node.js** and **MongoDB** installed.  
Then open the terminal in the project folder and run:
```bash
npm install
```

### 2. Start MongoDB
Run MongoDB locally (default port `27017`).  
No authentication is required for local setup.

The database name is your registration number:  
`L2F23BSSE0389`

### 3. Start the Server
```bash
npm start
```
or (for auto reload)
```bash
npm run dev
```

You should see:
```
Mongoose connected to database: L2F23BSSE0389
Server is running on port 3000
```

---

## API Base URL
```
http://localhost:3000
```

---

## API Endpoints

### 1 Add a New Book  
**POST** `/lms/books`  
Add a new book record to the system.  
**Body (JSON):**
```json
{
  "bookID": 101,
  "title": "Node.js Basics",
  "author": "Alice Johnson",
  "genre": "Technology",
  "publishedYear": 2022
}
```
**Response:**
```json
{
  "message": "Book added",
  "book": { ... }
}
```

---

### 2️ Add a New Member  
**POST** `/lms/members`  
**Body (JSON):**
```json
{
  "memberID": 201,
  "name": "John Smith",
  "email": "john.smith@example.com",
  "department": "CS",
  "role": "student",
  "gender": "male"
}
```
**Response:**
```json
{
  "message": "Member added",
  "member": { ... }
}
```

---

### 3️ Fetch All Books  
**GET** `/lms/books`  
**Response:**
```json
{
  "count": 2,
  "books": [ ... ]
}
```

---

### 4️ Fetch All Members  
**GET** `/lms/members`

---

### 5️ Fetch Available Books  
**GET** `/lms/books/available`  
Returns books where `isAvailable` = true.

---

### 6️ Fetch Issued Books  
**GET** `/lms/books/issued`  
Returns books where `isAvailable` = false.

---

### 7️ Fetch Books by Genre  
**GET** `/lms/books/genre/:type`  
Example:
```
/lms/books/genre/Science
```

---

### 8️ Fetch Recently Joined Members  
**GET** `/lms/members/recent`  
Returns members who joined in the last **60 days**.

---

### 9️ Fetch Members by Role  
**GET** `/lms/members/role/:role`  
Example:
```
/lms/members/role/student
/lms/members/role/faculty
```

---

### Filter Available Books by Genre & Year  
**GET**
```
/lms/books/available?genre=Science&publishedYear=2022
```

---

##  Example Testing with Postman

1. Open **Postman** → Create a new request.
2. Select **POST** or **GET** based on the endpoint.
3. For POST:
   - Select **Body** → **raw** → **JSON**
   - Paste example JSON body.
4. Click **Send**.
5. You’ll receive a JSON response like:
   ```json
   {
     "message": "Book added",
     "book": { "bookID": 101, "title": "Node.js Basics", ... }
   }
   ```

---

##  Error Handling
All routes use **try...catch** blocks and return meaningful status codes:
| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Created Successfully |
| 400 | Bad Request / Missing Fields |
| 404 | Not Found |
| 500 | Server Error |

---

## Key Concepts Demonstrated
- Express.js Routing  
- RESTful API Design  
- MongoDB CRUD Operations  
- Mongoose Schema Validation  
- Asynchronous Programming (`async/await`)  
- Error Handling with `try...catch`

---

## Example Console Output
```
Mongoose connected to database: L2F23BSSE0389
Server is running on port 3000
POST /lms/books - Book added
GET /lms/books - 200 OK
```

---

##  Notes
- `isAvailable = false` means the book is **issued**.
- Both `/LMS/members/role/:role` and `/lms/members/role/:role` are supported (case-insensitive per assignment).
- Body-Parser middleware (`app.use(bodyParser.json())`) ensures the request body is readable as JSON.

---

## Submission
Zip the following items and upload on the UCP Portal:
```
LMS-API/
  ├── index.js
  ├── connection.js
  ├── package.json
  ├── models/
  │    ├── Book.js
  │    └── Member.js
  ├── README.md
  └── (Word file with Postman screenshots)
```

---

## Author
**Name:** Areef ur Rahman  
**Registration No:** L2F23BSSE0389  
**Course:** Web Application Development  
**Semester:** Fall 2025  

