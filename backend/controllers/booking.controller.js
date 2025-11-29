const bookingService = require('../services/booking.service');
const { validationResult } = require('express-validator');

module.exports.createBooking = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, fare, patientName, patientPhone, notes, pickupCoords, destinationCoords } = req.body;
        const booking = await bookingService.createBooking({
            user: req.user._id,
            pickup,
            destination,
            fare,
            patientName,
            patientPhone,
            notes,
            pickupCoords,
            destinationCoords
        });
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const driverId = req.driver ? req.driver._id : null;
        const booking = await bookingService.updateBookingStatus(id, status, driverId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getPendingBookings = async (req, res, next) => {
    try {
        const pendingBookings = await bookingService.getPendingBookings();
        res.status(200).json(pendingBookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getDriverBookings = async (req, res, next) => {
    try {
        const driverBookings = await bookingService.getDriverBookings(req.driver._id);
        res.status(200).json(driverBookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getBookingById = async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
