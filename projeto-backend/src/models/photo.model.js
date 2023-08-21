const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  title: {
    type: String,
    default: ''
  },
  postDate: {
    type: Date,
  },
  description: {
    type: String,
    default: ''
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false,
  },
  likes: [ {type: mongoose.Schema.Types.ObjectId} ],
  // pensar em como colocar o esquema de likes aqui de acordo com um que seria no MySQL
});

const PhotoSchema = mongoose.model('Photo', photoSchema);
module.exports = PhotoSchema;
