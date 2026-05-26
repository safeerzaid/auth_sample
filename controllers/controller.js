const User = require('../models/user')
const bycript = require('bcryptjs')

exports.registerUser = async (req,res) => {
  try{
    const {username, email, password} = req.body

    const userExists = await User.findOne({email})
    if(userExists){
      return res.status(400).json({message: "user already exists"})
    }

  const salt = await bycript.genSalt(10);
  const hashedPassword = await bycript.hash(password, salt)

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  res.status(201).json({message: 'User registered successfully'})
}catch(error){
  res.status(500).json({error: error.message})
}
};