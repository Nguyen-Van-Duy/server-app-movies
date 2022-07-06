import express from 'express';
import { UploadFileController } from '../controllers/UploadFileController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload-profile-pic',upload.single('image_movie'), UploadFileController)

export default router;