const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const DriverController = require('../controllers/driver.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const { authLimiter } = require('../middlewares/rateLimit.middleware');


router.post('/register', authLimiter,
  [body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('fullname.firstName').notEmpty().withMessage('FirstName is required'),
  body('phoneNumber').notEmpty().withMessage('Phone Number is required'),
  DriverController.registerDriver]
)

router.post('/login', authLimiter,
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  DriverController.loginDriver
)

router.get('/profile', authMiddleware.authDriver, DriverController.getDriverProfile)


router.post('/logout', authMiddleware.authDriver, DriverController.logoutDriver)

router.put('/status', authMiddleware.authDriver, DriverController.updateDriverStatus)

module.exports = router