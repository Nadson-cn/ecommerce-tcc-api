
/*
const multer = require("multer");

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/upload/users')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)  
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if(extensaoImg){
            return cb(null, true);
        }

        return cb(null, false);
    }
}));


const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
    // destination: (req, file, callback) => callback(null, __dirname + '/../public/images'),
    // filename: (req, file, callback) => callback(null, Date.now + "-" + file.fieldname + '.jpg' )
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ){
            callback(null, true)
        } else {
            console.log("Only jpg & png file supported!");
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, __dirname + '/../public/images'),
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jpg' )
});

const upload = multer({ storage });

module.exports = upload;
*/