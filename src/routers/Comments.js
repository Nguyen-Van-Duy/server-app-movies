import express from 'express';
import { GetCommentController, SendCommentController, DeleteCommentController, EditCommentController } from '../controllers/CommentController.js';

const router = express.Router();

router.put('/edit', EditCommentController)
router.get('/:movieId', GetCommentController)
router.post('/add-comment', SendCommentController)
router.delete('/delete/:commentId', DeleteCommentController)


export default router;