const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost:27017/L1F23BSSE0389';
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('connected', ()=>{console.log("Database Connected")})
db.on('error', ()=>{console.log("Database Connection Error")})
db.on('disconnected', ()=>{console.log("Database Disconnected")})

module.exports = db;