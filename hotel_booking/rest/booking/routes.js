const express = require('express');
const { bookHotel, getUserBookings, updateBooking, cancelBooking } = require('./controller');
const router = express.Router();

router.post('/bookings', bookHotel);
router.get('/bookings', getUserBookings);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', cancelBooking);

module.exports = router;
