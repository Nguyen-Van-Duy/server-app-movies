import express from 'express';
import { SendMovieController } from '../controllers/MovieController.js';

const router = express.Router();

router.post('/add-movie', SendMovieController)
// router.get('/:userId', GetIdConversation)


export default router;