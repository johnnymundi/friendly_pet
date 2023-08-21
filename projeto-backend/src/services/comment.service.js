const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

// creates a comment
const createComment = async (photoBody) => {
  return Comment.create(photoBody);
};

// query for all comments by Photo id
const queryAllComments = async () => {
  return Comment.find({}).populate('Photo')
}

module.exports = {
  createComment,
  queryAllComments
}
