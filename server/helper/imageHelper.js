import multer  from 'multer';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
      },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});



const upload = multer({ storage: storage }).single('profileImg');
export default upload;