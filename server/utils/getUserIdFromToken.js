const User = require('../models/User')
const jwt = require('jsonwebtoken');


const getUserFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error in token verification:', error.message);
        throw new Error('Token expired, invalid, or user not found');
    }
}

module.exports = getUserFromToken;
