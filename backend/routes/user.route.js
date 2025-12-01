const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const { authLimiter } = require('../middlewares/rateLimit.middleware');

router.post('/register', authLimiter,
  body('email').isEmail().withMessage('Email is required'),
  body('phone').isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  userController.registerUser
)

router.post('/login', authLimiter,
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  userController.loginUser
)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile)

router.get('/history', authMiddleware.authUser, userController.getUserHistory);

router.post('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;