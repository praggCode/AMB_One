const nodemailer = require('nodemailer');

let transporter;

const createTransporter = async () => {
    if (transporter) return transporter;
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return transporter;
};

const sendEmail = async (to, subject, html) => {
    try {
        const transport = await createTransporter();
        const info = await transport.sendMail({
            from: '"Ambulance Service" <no-reply@ambulance.com>',
            to,
            subject,
            html,
        });

        return info;
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = {
    sendBookingConfirmation: async (email, booking) => {
        const subject = `Booking Confirmed #${booking.bookingId || booking._id.toString().slice(-6)}`;
        const html = `
            <h1>Booking Confirmed</h1>
            <p>Your ambulance booking has been received.</p>
            <p><strong>Pickup:</strong> ${booking.pickup}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
            <p><strong>Fare:</strong> ₹${booking.fare}</p>
            <p>We are looking for a driver nearby.</p>
        `;
        return sendEmail(email, subject, html);
    },
    sendDriverAssigned: async (email, driver, booking) => {
        const subject = `Driver Assigned #${booking.bookingId || booking._id.toString().slice(-6)}`;
        const html = `
            <h1>Driver Assigned</h1>
            <p>A driver has accepted your booking.</p>
            <p><strong>Driver Name:</strong> ${driver.fullname.firstName} ${driver.fullname.lastName}</p>
            <p><strong>Phone:</strong> ${driver.phoneNumber}</p>
            <p><strong>Vehicle:</strong> ${driver.vehicle ? `${driver.vehicle.vehicleType} (${driver.vehicle.licensePlate})` : 'N/A'}</p>
            <p>The driver is on the way.</p>
        `;
        return sendEmail(email, subject, html);
    },
    sendBookingCancelled: async (email, booking) => {
        const subject = `Booking Cancelled #${booking.bookingId || booking._id.toString().slice(-6)}`;
        const html = `
            <h1>Booking Cancelled</h1>
            <p>Your booking has been cancelled by the driver.</p>
            <p><strong>Pickup:</strong> ${booking.pickup}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
            <p>Please try booking again to find another driver.</p>
        `;
        return sendEmail(email, subject, html);
    }
};
