import express from 'express';
import { SendProfileUserController } from '../controllers/ProfileUserController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload',upload.fields([
    {
        name: 'image_movie', maxCount: 1
    },
    {
        name: 'image_movie2', maxCount: 1
    }
]), SendProfileUserController)

export default router;