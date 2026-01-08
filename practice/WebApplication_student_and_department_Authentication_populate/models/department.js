const mongoose = require('mongoose')

const DepartmentSchema = mongoose.Schema({

    Name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(DepartmentSchema, 'department')