const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    followedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isFollowing: {
        type: Boolean,
        default: true
    }
});

module.exports = followSchema;
