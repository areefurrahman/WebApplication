const express = require("express");
const session = require("express-session");
const passport = require("passport");

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();
connectDB();

// Middleware
app.use(express.json());

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/students", studentRoutes);
app.use("/departments", departmentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
