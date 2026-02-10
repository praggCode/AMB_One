const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register',
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10-15 digits'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  userController.registerUser
)

router.post('/login',
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/history', authMiddleware.authUser, userController.getUserHistory);

router.post('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;