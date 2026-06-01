const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

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
exports.forgotPassword = async (req,res) => {
  try{
    const {email} = req.body

    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({sucess: false, message: 'user not found'})
    }

    const resetToken = crypto.randomBytes(20).toString('hex')
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now()+10*60*1000

    await user.save()

    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`
    console.log(`Reset link sent ${resetUrl}`);
    
    res.status(200).json({
      success: true,
      message: "sent link on your email id"
    })
  }catch(error){
    res.status(500).json({success: false, message: error.message})
  }
}


exports.resetPassword = async (req,res)=> {
  try{
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {$gt: Date.now()}
    });


    if(!user){
      return res.status(400).json({
        success: false,
        message: 'link is invalid'
      })
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  
    await user.save()

    res.status(200).json({
      success: true,
      message: "password changed"
    })
  }catch(error){
    res.status(500).json({success: false, message: error.message})
  }
}

