import express from 'express';
import { SendProfileUserController } from '../controllers/ProfileUserController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload',upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'image-backdrop', maxCount: 1
    },
    {
        name: 'image-poster', maxCount: 1
    }
]), SendProfileUserController)

export default router;