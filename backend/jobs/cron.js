const cron = require('node-cron');
const Booking = require('../models/booking.model');

const startCronJobs = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
            const result = await Booking.updateMany(
                {status: 'pending',createdAt: { $lt: tenMinutesAgo }},
                {
                    $set: { status: 'cancelled' }
                }
            )
            if (result.modifiedCount > 0) {
                console.log(`[Cron] Auto-cancelled ${result.modifiedCount} expired bookings.`);
            }
        } catch (error) {
            console.error('[Cron] Error auto-cancelling bookings:', error);
        }
    });

    console.log('[Cron] Background jobs started.');
};

module.exports = startCronJobs;
