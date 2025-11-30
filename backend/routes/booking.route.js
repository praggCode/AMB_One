const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('fare').isNumeric().withMessage('Fare must be a number'),
    body('patientName').isString().isLength({ min: 3 }).withMessage('Patient name is required'),
    body('patientPhone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('notes').optional().isString(),
    bookingController.createBooking
);

router.put('/:id/status',
    authMiddleware.authDriver,
    body('status').isIn(['accepted', 'arrived', 'completed', 'cancelled']).withMessage('Invalid status'),
    bookingController.updateBookingStatus
);

router.get('/pending',
    authMiddleware.authDriver,
    query('lat').optional().isNumeric().withMessage('Latitude must be a number'),
    query('lon').optional().isNumeric().withMessage('Longitude must be a number'),
    bookingController.getPendingBookings
);
router.get('/driver-history', authMiddleware.authDriver, bookingController.getDriverBookings);
router.get('/:id', authMiddleware.authDriver, bookingController.getBookingById);

module.exports = router;
