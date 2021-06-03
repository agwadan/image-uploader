const UploadModel = require('../models/schema');
const fs = require('fs');

exports.home = async (req, res) => {
  const all_images = await UploadModel.find()
  res.render('main', { images: all_images });
}

exports.upload = (req, res, next) => {
  const files = req.files;

  if (!files) {
    const error = new Error('Please choose a file');
    error.httpStatusCode = 400;
    return next(error);
  }

  /* convert images to base64 encoding */
  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path)
    return encoded_Image = img.toString('base64')
  })

  let result = imgArray.map((src, index) => {
    /* create object to store data in the db */
    let finalImg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src
    }

    let newUpload = new UploadModel(finalImg);

    return newUpload
      .save()
      .then(() => {
        return { msg: `${files[index].originalname} image successfully uploaded` }
      })
      .catch(error => {
        if (error) {
          if (error.name === 'MongoError' && error.code === 11000) {
            return Promise.reject({ error: `Duplicate ${files[index].originalname}` })
          }
          return Promise.reject({ error: error.message || `Cannot Upload ${files[index].originalname}` })
        }
      })
  })

  /* res.json(imgArray)*/

  Promise.all(result)
    .then(msg => {
      /*  res.json(msg); */
      res.redirect('/');
    })
    .catch(err => {
      res.json(err)
    });
}