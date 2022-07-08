import multer from "multer";
import path from "path";
import appRoot from "app-root-path";

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        console.log(">>> check:", file)
        cb(null,appRoot + '/src/public/image/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        if(file.fieldname === "avatar") {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        } else if(file.fieldname === "image_backdrop") {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        } else if(file.fieldname === "image_poster") {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        } else {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    
    cb(null, true);
};

export const upload = multer({
    storage,
    // limits: { fileSize: 500000 },
    fileFilter: imageFilter
})