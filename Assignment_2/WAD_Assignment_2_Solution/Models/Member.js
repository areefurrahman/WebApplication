const mongoose = require('mongoose');
const allowedRoles = ['student', 'faculty'];
const MemberSchema = new mongoose.Schema({
  memberID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    default: null
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    required: true,
    enum: allowedRoles
  },
  gender: {
    type: String,
    default: null
  }
});

// index for memberID uniqueness
MemberSchema.index({ memberID: 1 }, { unique: true });

module.exports = mongoose.model('Member', MemberSchema);
