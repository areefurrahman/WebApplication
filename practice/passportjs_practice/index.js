const express = require('express');
const passport = require('passport');

require('./config/passport')
require('./config/connection')
const userAuthRoutes = require("./routes/auth")

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(passport.initialize());



app.use(userAuthRoutes);

app.listen(PORT, ()=>{
    console.log(`server is Running at port localhost:${PORT}`);
})