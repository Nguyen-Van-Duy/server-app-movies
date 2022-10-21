import express from 'express';
import { SendProfileUserController, sendEmailController, forgotPasswordController, ResetPasswordController, UpdateScheduleController } from '../controllers/ProfileUserController.js';
import verifyToken from '../middleware/auth.js';
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

router.post('/update-schedule',upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'image-backdrop', maxCount: 1
    },
    {
        name: 'image-poster', maxCount: 1
    }
]), UpdateScheduleController)

router.post('/send-email', sendEmailController)

router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password', verifyToken, ResetPasswordController)

export default router;