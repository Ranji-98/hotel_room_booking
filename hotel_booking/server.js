require('dotenv').config();
const express = require('express');
const { sequelize } = require('./config/database');
const hotelRoutes = require('./rest/hotel/routes');
const bookingRoutes = require('./rest/booking/routes');

const app = express();
app.use(express.json());

app.use('/api', hotelRoutes);
app.use('/api', bookingRoutes);

console.log('First line');
console.log('port: ', process.env.PORT);
const PORT = process.env.PORT || 3000;

console.log('port1: ', process.env.PORT);


sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Error syncing database:', err));
