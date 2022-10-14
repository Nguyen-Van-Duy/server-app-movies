import express from 'express';
import { SendFeedbackController, GetFeedbackController } from '../controllers/FeedbackController.js';

const router = express.Router();

router.get('', GetFeedbackController)
router.post('/add-feedback', SendFeedbackController)
router.delete('/delete/:Id', SendFeedbackController)


export default router;