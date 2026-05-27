const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// registration-----------
exports.registerUser = async (req,res) => {
  try{
    const {username, email, password} = req.body

    const userExists = await User.findOne({email})
    if(userExists){
      return res.status(400).json({message: "user already exists"})
    }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

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

// login-----------------------

exports.loginUser = async (req, res) => {
  try{
    const {email,password} = req.body

    if(!email || !password){
      return res.status(400).json({message: 'all fields are required'})
    }

    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message: 'invalid credintials'})
    }
   
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: 'Invalid credintials'})
    }

   const token = jwt.sign(
    {id: user._id},
    process.env.JWT_SECRET,
    {expiresIn: '1d'}
   );

    res.status(200).json({
      message: 'Login Successful',
      token: token,
      user: {
        id: user._id,
        email: user.email
      }
    })
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

//forget password


