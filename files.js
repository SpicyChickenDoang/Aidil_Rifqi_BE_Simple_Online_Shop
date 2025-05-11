const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/assets/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
