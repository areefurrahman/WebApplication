const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/College"

mongoose.connect(url)

const db = mongoose.connection;
db.on('connected', ()=>{console.log("DB Connected Sucessfully")})
db.on('disconnected', ()=>{console.log("DB Disconnected")})
db.on('error', ()=>{console.log("DB Connection Error")})

module.exports = db;