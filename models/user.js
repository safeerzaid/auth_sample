const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },

  resetPasswordToken: {
    type: String,
    default: undefined
},
  resetPasswordExpires: {
    type: Date,
    default: undefined
  }
},
{
  timestamps: true,
}
)
 
module.exports = mongoose.model('User', userSchema)


