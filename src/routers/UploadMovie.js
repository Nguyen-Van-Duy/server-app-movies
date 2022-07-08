import express from 'express';
import { SendProductController } from '../controllers/UploadMovieController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload-movie', upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'image_backdrop', maxCount: 1
    },
    {
        name: 'image_poster', maxCount: 1
    }
]), SendProductController)

export default router;