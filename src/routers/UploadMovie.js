import express from 'express';
import { SendProductController, UpdateMovieController, GetScheduleDetailController, AddScheduleController, GetScheduleController, GetScheduleIdController, DeleteScheduleController } from '../controllers/UploadMovieController.js';
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

router.get('/schedule', GetScheduleController)
router.get('/schedule/:userId', GetScheduleIdController)
router.get('/schedule-detail/:movieId', GetScheduleDetailController)
router.delete('/delete-schedule/:scheduleId', DeleteScheduleController)

export default router;