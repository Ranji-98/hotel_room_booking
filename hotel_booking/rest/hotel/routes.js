const express = require('express');
const { getAllHotels, createHotel } = require('./controller');
const router = express.Router();

router.get('/hotels', getAllHotels);
router.post('/hotels', createHotel);

module.exports = router;
