const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    username: String,
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    messages: { type: Number, default: 1 },
    created: {
        type: Date,
        default: Date.now
    }
});

const configSchema = mongoose.Schema({
    prefix: { type: String, default: "&" },
});

module.exports = {
    userSchema,
    configSchema,
};