const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Hotel = sequelize.define('Hotel', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rooms_available: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: true });

module.exports = Hotel;
