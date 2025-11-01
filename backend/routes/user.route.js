const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', 
  body('email').isEmail().withMessage('Email is required'),
  body('phone').isMobilePhone().withMessage('Phone number is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.registerUser
)

router.post('/login',
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.loginUser
)
module.exports = router;