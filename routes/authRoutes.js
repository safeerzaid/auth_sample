const express = require('express');
const { registerUser, loginUser } = require('../controllers/controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/profile', protect, (req,res) => {
  res.status(200).json({
    message: 'welcome to your secure user profile dashboard!',
    user: req.user
  })
})

module.exports = router;