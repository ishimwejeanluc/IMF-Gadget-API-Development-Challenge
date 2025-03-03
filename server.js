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

app.get('/', (req, res) => {
    res.send('Welcome to IMF GADGET CHALLENGE. Check the API documentation .');
});

app.listen(3000, async () => {
    await sequelize.sync({ alter: true });
    console.log('Server running on port 3000');
});
