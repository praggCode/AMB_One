const Booking = require('../models/booking.model');

module.exports.createBooking = async ({ user, pickup, destination, fare }) => {
    if (!user || !pickup || !destination || !fare) {
        throw new Error('All fields are required');
    }
    const booking = await Booking.create({
        user,
        pickup,
        destination,
        fare
    });
    return booking;
}

module.exports.updateBookingStatus = async (bookingId, status) => {
    if (!bookingId || !status) {
        throw new Error('Booking ID and status are required');
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    return booking;
}
