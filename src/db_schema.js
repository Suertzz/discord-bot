const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    username: String,
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    last_message: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    userSchema,
};