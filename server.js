// server.js
const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');
const gadgetRoutes = require('./routes/gadgets');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/gadgets', authenticateToken, gadgetRoutes);

app.listen(3000, async () => {
    await sequelize.sync();
    console.log('Server running on port 3000');
});
