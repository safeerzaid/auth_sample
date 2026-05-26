const mongoose = require('mongoose')

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connction successfull')
  }catch (error){
    console.log('DB conection failed', error.message)
    process.exit(1)
  }
}

module.exports = connectDB;