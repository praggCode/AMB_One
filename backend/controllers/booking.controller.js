const bookingService = require('../services/booking.service');
const { validationResult } = require('express-validator');

module.exports.createBooking = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, fare } = req.body;
        const booking = await bookingService.createBooking({
            user: req.user._id,
            pickup,
            destination,
            fare
        });
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
