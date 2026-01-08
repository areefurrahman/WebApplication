const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({

    Name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
})


const Student = mongoose.model('Student', StudentSchema, 'student')
module.exports = Student;