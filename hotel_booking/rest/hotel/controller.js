const Hotel = require('./model');

const getAllHotels = async (req, res) => {
    try {
        const { location } = req.query;
        const whereCondition = location ? { location } : {};
        const hotels = await Hotel.findAll({ where: whereCondition });

        if (hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels available for this location' });
        }

        res.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const createHotel = async (req, res) => {
    try {
        const { name, location, rooms_available } = req.body;

        if (!name || !location || !rooms_available) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hotel = await Hotel.create({ name, location, rooms_available });
        res.status(201).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create hotel' });
    }
};

module.exports = { getAllHotels, createHotel };
