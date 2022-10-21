import express from 'express';
import { SendFeedbackController, GetFeedbackController, DeleteFeedbackController } from '../controllers/FeedbackController.js';

const router = express.Router();

router.get('', GetFeedbackController)
router.post('/add-feedback', SendFeedbackController)
router.delete('/delete/:id', DeleteFeedbackController)


export default router;