const httpStatus = require('http-status');
const { Photo } = require('../models');
const ApiError = require('../utils/ApiError');

// creates a photo
const createPhoto = async (photoBody) => {
  return Photo.create(photoBody);
};

// query for all comments
const queryAllPhotos = async () => {
  return Photo.find({})
}

// query comments by user id
const queryAllByUserPhotos = async () => {
  return Photo.find({}).populate('User')
}

const queryOnePhoto = async (photoId) => {
  return Photo.findOne({_id: photoId})
}

const deleteOnePhoto = async (photoId) => {
  return Photo.deleteOne({_id: photoId}) // falta entender porque não funciona com o validate lá no router ativado
}

const updatePhoto = async (photoId, body) => {
  console.log(photoId, body)
    return await Photo.findByIdAndUpdate(photoId, body, {new: true, useFindAndModify: false}) //falta entender porque não tá funcionando

}

module.exports = {
  createPhoto,
  queryAllPhotos,
  queryAllByUserPhotos,
  queryOnePhoto,
  deleteOnePhoto,
  updatePhoto,
}
