const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/controller');
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

router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)

module.exports = router;