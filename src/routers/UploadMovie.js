import express from 'express';
import { SendProductController, UpdateMovieController, AddScheduleController } from '../controllers/UploadMovieController.js';
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

router.post('/update-movie', upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'image_backdrop', maxCount: 1
    },
    {
        name: 'image_poster', maxCount: 1
    }
]), UpdateMovieController)

router.post('/add-schedule', upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'image_backdrop', maxCount: 1
    },
    {
        name: 'image_poster', maxCount: 1
    }
]), AddScheduleController)

router.post('/update-schedule', upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'image_backdrop', maxCount: 1
    },
    {
        name: 'image_poster', maxCount: 1
    }
]), AddScheduleController)

export default router;