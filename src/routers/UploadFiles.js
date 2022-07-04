import express from 'express';
import multer from "multer";
import path from "path";
import appRoot from "app-root-path";
import { UploadFileController } from '../controllers/UploadFileController.js';

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        console.log(">>> check:", file)
        cb(null,appRoot + '/src/public/image/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    console.log("sssssssssss", req)
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    // if (parseInt(req.headers['content-length']) > 500000) {
    //     return alert('dddddđ');
    // }
    cb(null, true);
};

// let maxSize = 500000
export const upload = multer({
    storage,
    // limits: { fileSize: 500000 },
    fileFilter: imageFilter
})

const router = express.Router();

router.post('/upload-profile-pic',upload.single('profile_pic'), UploadFileController)


export default router;