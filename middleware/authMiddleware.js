const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error("Token Verification failed", error.message);
    return res.status(401).json({ message: "not authorized, token failed" })
  }
}

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Role '${req.user?.role || 'Guest'}' is not allowed to access this resource`
      });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles }