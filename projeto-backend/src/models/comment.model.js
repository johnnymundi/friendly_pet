const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  PostRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  },
  text: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date
  },
});

const CommentSchema = mongoose.model('Comment', commentSchema);
module.exports = CommentSchema;
