const express = require('express')
const passport = require('passport')
const session = require('express-session')

require('./config/connection')
const studentRoutes = require('./routes/studentRoutes')
const departmentRoutes = require('./routes/departmentRoutes')

const app = express();
const port = 3000;

app.use(express.json())
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use(departmentRoutes)
app.use(studentRoutes)



app.listen(port, ()=>{
    console.log("Server is Open at port 3000")

})