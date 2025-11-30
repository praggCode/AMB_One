const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    patientPhone: {
        type: String
    },
    notes: {
        type: String
    },
    pickupCoords: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    destinationCoords: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentId: {
        type: String
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    }
}, { timestamps: true });

bookingSchema.index({ pickupCoords: '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);
