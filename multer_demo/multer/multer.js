const multer = require('multer');


const mimtypes = [
    'image/jpeg','image/png'
]


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
        if( mimtypes.includes(file.mimetype)) {
            cb(null, Date.now() + '-' + file.originalname);
        }
        else
        {
            console.log('Not Supported File');
            cb(new Error('only png & jpeg allowed'))
        }
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;