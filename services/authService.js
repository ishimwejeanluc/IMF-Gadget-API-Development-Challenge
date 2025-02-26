// services/authService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    // Register a new user
    async register(username, password) {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) throw new Error('User already exists');

        return await User.create({ username, password });
    }

    // Login and return JWT token
    async login(username, password) {
        const user = await User.findOne({ where: { username } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid credentials');
        }

        return jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = new AuthService();
