const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: {
    type: String,
  },
})

module.exports = mongoose.model('Comment', CommentSchema)
