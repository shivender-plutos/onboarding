const multer =require('multer');
const storage = multer.diskStorage({})
const uploadFile = multer({storage});

module.exports = uploadFile;