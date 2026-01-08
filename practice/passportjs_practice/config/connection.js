const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/college";

mongoose.connect(url);
const db = mongoose.connection;

db.on('connected', ()=>{console.log("DB Connected")});
db.on('error', ()=>{console.log("DB Connected")});
db.on('disconnected', ()=>{console.log("DB Disconnected")});

module.exports = db;