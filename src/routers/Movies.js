import express from 'express';
import { SendMovieController, GetMovieWaitingController, GetMyMovieController } from '../controllers/MovieController.js';

const router = express.Router();

router.post('/add-movie', SendMovieController)
router.get('/movie-waiting/:userId', GetMovieWaitingController)
router.get('/my-movie/:userId', GetMyMovieController)


export default router;