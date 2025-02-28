// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with logging enabled
const sequelize = new Sequelize(process.env.DB_URL, {
    logging: console.log, // Enable logging to see the SQL queries
});



module.exports = sequelize;
