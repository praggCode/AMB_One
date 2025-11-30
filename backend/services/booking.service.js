const Booking = require('../models/booking.model');

module.exports.createBooking = async ({ user, pickup, destination, fare, patientName, patientPhone, notes, pickupCoords, destinationCoords }) => {
    if (!user || !pickup || !destination || !fare || !patientName) {
        throw new Error('All required fields are provided');
    }
    if (!pickupCoords || !destinationCoords) {
        throw new Error('Pickup and Destination coordinates are required. Please select from map/suggestions.');
    }
    const bookingId = `BK${Date.now().toString().slice(-6)}`;
    const booking = await Booking.create({
        user,
        pickup,
        destination,
        fare,
        patientName,
        patientPhone,
        notes,
        pickupCoords: {
            type: 'Point',
            coordinates: [pickupCoords.lon, pickupCoords.lat]
        },
        destinationCoords: {
            type: 'Point',
            coordinates: [destinationCoords.lon, destinationCoords.lat]
        },
        bookingId
    });
    return booking;
}

module.exports.updateBookingStatus = async (bookingId, status, driverId) => {
    if (!bookingId || !status) {
        throw new Error('Booking ID and status are required');
    }

    const updateData = { status };
    if (status === 'accepted' && driverId) {
        updateData.driver = driverId;
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
    return booking;
}

module.exports.getPendingBookings = async (driverLat, driverLon) => {
    if (driverLat && driverLon) {
        return await Booking.find({
            status: 'pending',
            pickupCoords: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(driverLon), parseFloat(driverLat)]
                    },
                    $maxDistance: 10000
                }
            }
        });
    }
    return await Booking.find({ status: 'pending' }).sort({ createdAt: -1 });
}

module.exports.getDriverBookings = async (driverId) => {
    return await Booking.find({ driver: driverId }).sort({ createdAt: -1 });
}

module.exports.getBookingById = async (bookingId) => {
    return await Booking.findById(bookingId);
}
