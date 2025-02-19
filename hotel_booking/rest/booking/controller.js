const Booking = require('./model');
const Hotel = require('../hotel/model');

// Hardcoded user (no login flow)
const USER_ID = '123e4567-e89b-12d3-a456-426614174000';

const bookHotel = async (req, res) => {
    try {
        const { hotel_id, rooms_booked, check_in, check_out } = req.body;

        const hotel = await Hotel.findOne({ where: { id: hotel_id } });
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        if (hotel.rooms_available < rooms_booked) {
            return res.status(400).json({ message: 'Not enough rooms available' });
        }

        const booking = await Booking.create({ user_id: USER_ID, hotel_id, rooms_booked, check_in, check_out });

        hotel.rooms_available -= rooms_booked;
        await hotel.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error('Error booking hotel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({ where: { user_id: USER_ID } });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { check_in, check_out, rooms_booked } = req.body;

        const booking = await Booking.findOne({ where: { id, user_id: USER_ID } });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (rooms_booked) {
            const hotel = await Hotel.findOne({ where: { id: booking.hotel_id } });
            if (hotel.rooms_available + booking.rooms_booked < rooms_booked) {
                return res.status(400).json({ message: 'Not enough rooms available' });
            }
            hotel.rooms_available += booking.rooms_booked - rooms_booked;
            await hotel.save();
        }

        await booking.update({ check_in, check_out, rooms_booked });
        res.json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findOne({ where: { id, user_id: USER_ID } });

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const hotel = await Hotel.findOne({ where: { id: booking.hotel_id } });
        hotel.rooms_available += booking.rooms_booked;
        await hotel.save();

        await booking.destroy();
        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { bookHotel, getUserBookings, updateBooking, cancelBooking };
