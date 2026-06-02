require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth/', authRoutes)

connectDB()

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
})