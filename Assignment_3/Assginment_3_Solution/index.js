const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./db');                 // DB connection
require('./config/passport');    // Passport config

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(passport.initialize());

app.use(authRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
