const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Person = require('../models/person');

const router = express.Router();

/* REGISTER USER */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Person({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGIN USER */
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json({ message: 'Login successful' });
  }
);

module.exports = router;
