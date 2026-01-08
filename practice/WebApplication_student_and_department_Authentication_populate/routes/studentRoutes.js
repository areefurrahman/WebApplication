const express = require('express')
const passport = require('passport')
const Student = require('../models/student')


const router = express.Router()

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

// POST Student (Register)
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    res.json({ message: "Login successful" });
  }
);



// GET Students (Protected + Populate Department)
router.get("/", async (req, res) => {
  const students = await Student.find().populate("department");
  res.json(students);
});


module.exports = router;