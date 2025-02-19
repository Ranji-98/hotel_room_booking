const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const Hotel = require('../hotel/model');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    hotel_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Hotel,
            key: 'id'
        }
    },
    rooms_booked: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    check_in: {
        type: DataTypes.DATE,
        allowNull: false
    },
    check_out: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: true });

module.exports = Booking;
