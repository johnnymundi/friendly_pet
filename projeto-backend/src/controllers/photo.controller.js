const httpStatus = require('http-status');
const PhotoSchema = require('../models/photo.model')
const { photoService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp')


const criaPhoto = catchAsync(async (req, res) => {
  console.log(req.body);
  const entity = new PhotoSchema({
    title: req.body.title,
    description: req.body.description,
    postedBy: req.user._id,
    url: req.file.path,
  });

  sharp(entity.url)
    .resize(200, 200)
    .jpeg({ quality: 90 })
  console.log(entity);
  const saved = await entity.save();
  res.status(httpStatus.CREATED);
  console.log(saved);
  res.json(saved);
  //const photo = await photoService.createPhoto(entity);
  //res.status(httpStatus.CREATED).send(photo);
});

const findPhotos = catchAsync(async (req, res) => {
  try {
      console.log('Listing all photos')
      const photo = await photoService.queryAllPhotos()
      res.status(200).json({ photo })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND);
  }
});

const findPhotosByUser = catchAsync(async (req, res) => {
  try {
      console.log('Listing all photos populated by User')
      const photo = await photoService.queryAllByUserPhotos()
      res.status(200).json({ photo })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND);
  }
});

const findOnePhoto = catchAsync(async (req, res) => {
  try {
    const {photoId} = req.params
    const photo = await photoService.queryOnePhoto(photoId)
    res.status(200).json({ photo })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND);
  }
})


const deletePhoto = catchAsync(async (req, res) => {
  const {photoId} = req.params
  try {
    await photoService.deleteOnePhoto(photoId)
    res.status(200).json({ message: 'photo succesfully deleted' })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND);
  }
})

const updatePhoto = catchAsync(async (req, res) => {
  try {
    const photoId = req.body._id
    const body  = req.body
    await photoService.updatePhoto(photoId, body)
    res.json({message: "okay "}).status(200)

  } catch(error) {
    console.log(error);
  }


  // MODIFICAR PARA RECEBER O LIKE TB
})

const uploadPhoto = catchAsync(async (req, res) => {
  const {photoURL} = req.body.url
  console.log(photoURL)
})

// colocar lean() dpois das requisições de getById pra retornar diretamente um JSON em vez do objeto do mongo que é mais pesado

module.exports = {
  findPhotos,
  findPhotosByUser,
  findOnePhoto,
  criaPhoto,
  deletePhoto,
  updatePhoto,
  uploadPhoto,
};
