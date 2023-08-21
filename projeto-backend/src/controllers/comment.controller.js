const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp')
const commentService = require('../services/comment.service')
const CommentSchema = require('../models/comment.model')

const criaComments = catchAsync(async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  console.log(req.user)
  const { commentText } = req.body;

 /*  const entity = new CommentSchema({
    text: req.body.text,
    PostRefId: req.params.id,
    comments: req.body.comments,
    postedBy: req.user._id,
    date: Date.now(),
  });

  const saved = await entity.save();
  res.status(httpStatus.CREATED);
  console.log(saved);
  res.json(saved);

  const comment = await commentService.createComment(commentText)
  console.log(comment) */
  // algum tipo de update em cima de photo pra adicionar ao array comments daquele id da photo;
})


const findComments = catchAsync(async (req, res) => {
  try {
      console.log('Listing all comments')
      const comment = await commentService.queryAllComments()
      res.status(200).json({ comment })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND);
  }
});

module.exports = {
  criaComments,
  findComments,
};
