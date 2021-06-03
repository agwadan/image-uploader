const multer = require('multer');

//Set storage
var storageVar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.substr(file.originalname.lastIndexOf('.'))// Grabbing the extension of the uploaded file
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

store = multer({ storage: storageVar });
module.exports = store;