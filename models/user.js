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
    type: string,
    required: [true, 'password is required']
  },
},
{
  timestamps: true,
}
)
 
module.exports = mongoose.model('User', userSchema)


