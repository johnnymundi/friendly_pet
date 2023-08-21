const express = require('express');
const app = require('../app')
const multer = require('multer')
const path = require('path')
const util = require('util')

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/imgs')
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const filePath = `/${ext}`
      cb(null, filePath);
    }
  })
  const upload = multer({storage: storage }).single('url')

const uploadFilesMiddleware = util.promisify(upload)
module.exports = uploadFilesMiddleware

