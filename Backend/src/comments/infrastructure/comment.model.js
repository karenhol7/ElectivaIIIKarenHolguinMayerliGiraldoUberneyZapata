const mongoose = require('mongoose');
const { commentSchema } = require('../domain/comment.schema');

const commentModel = mongoose.model('Comment', commentSchema);

module.exports = { commentModel };