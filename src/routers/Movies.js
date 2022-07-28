import express from 'express';
import { SendMovieController, 
    GetMovieWaitingController, 
    GetMyMovieController, 
    AddFavouriteController, 
    GetFavouriteController, 
    DeleteFavouriteController, 
    GetMyFavouriteController ,
    AddMovieHistoryController,
    GetMovieHistoryController,
    DeleteMovieHistoryController,
    DeleteMyMovieController,
    GetMovieDetailController,
    GetMovieWaitingAdminController
} from '../controllers/MovieController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/add-movie', SendMovieController)
router.post('/add-movie-history', AddMovieHistoryController)
router.get('/movie-waiting/:userId', GetMovieWaitingController)
router.get('/movie-waiting', GetMovieWaitingAdminController)
router.get('/movie-history/:userId', GetMovieHistoryController)
router.get('/my-movie/:userId', GetMyMovieController)
router.get('/movie-detail/:movieId', GetMovieDetailController)
router.post('/add-favourite', AddFavouriteController)
router.delete('/delete-favourite/:favouriteId', DeleteFavouriteController)
router.delete('/delete-my-movie/:movieId', verifyToken, DeleteMyMovieController)
router.post('/delete-history', DeleteMovieHistoryController)
router.get('/favourite/:userId/:movieId', GetFavouriteController)
router.get('/my-favourite/:userId', GetMyFavouriteController)

export default router;