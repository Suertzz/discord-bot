const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    username: String,
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    messages: { type: Number, default: 1 },
    cookie: { type: Number, default: 0 },
    created: {
        type: Date,
        default: Date.now
    },
    jail: {
        state: false,
        permanent: false,
        date: {
            type: Date,
            default: null
        }
    },
    antipub: {
        state: false,
        permanent: false,
        date: {
            type: Date,
            default: null
        }
    }
});

const configSchema = mongoose.Schema({
    prefix: { type: String, default: "&" },
});

module.exports = {
    userSchema,
    configSchema,
};