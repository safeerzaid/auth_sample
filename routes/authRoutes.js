const express = require('express')
const router = express.Router();

router.post('/register', (req,res) => {
  res.send('This is register Route')
})

router.post('/login', (req,res) => {
  res.send('This is Login routes')
})

module.exports = router;