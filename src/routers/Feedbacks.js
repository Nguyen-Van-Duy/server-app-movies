import express from 'express';
import { GetCommentController, SendCommentController, DeleteCommentController, EditCommentController } from '../controllers/CommentController.js';
import { SendFeedbackController } from '../controllers/FeedbackController.js';

const router = express.Router();

router.get('', GetFeedbackController)
router.post('/add-feedback', SendFeedbackController)
router.delete('/delete/:commentId', DeleteCommentController)


export default router;