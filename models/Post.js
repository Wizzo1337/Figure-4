const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  summary: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  usersLiked: {
    type: Array,
  },
  public: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
