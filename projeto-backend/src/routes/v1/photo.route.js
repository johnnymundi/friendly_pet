const express = require('express');
const { photoController } = require('../../controllers/');
const { commentController } = require('../../controllers/')
const auth = require('../../middlewares/auth');
const multer = require('multer')
const router = express.Router();
const sharp = require('sharp') // usado para redimensionar as imagens que serão salvas pelo upload

// seta o upload de fotos e a pasta /uploads como local para armazenamento de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

router
  .route('/')
  .get(auth(), photoController.findPhotos)
  .post(auth(), upload.single('url'), photoController.criaPhoto)


router
  .route('/upload')
  .get(auth(), photoController.findPhotos)

router
  .route('/:photoId')
  .get(auth(), photoController.findOnePhoto)
  .put(photoController.updatePhoto) // o update atualiza tanto as infos das fotos que vão para upload quanto o like array
  .delete(photoController.deletePhoto) // o validate não tá deixando deletar :0

router
  .route('/:photoId/comments')
  .get(commentController.findComments)
  .post(commentController.criaComments)


/* router
  .route('/like')
  .patch(photoController.likePhoto) */

/* router
  .route('/:photoId/comments')
  .get(commentController.getComments)
  .post(commentController.criaComment)
 */
module.exports = router;
