import express from 'express';
import { SendProfileUserController } from '../controllers/ProfileUserController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload',upload.single('image_movie'), SendProfileUserController)

export default router;