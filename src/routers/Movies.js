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
    GetMovieWaitingAdminController,
    UpdateApprovalController,
    GetMovieDetailFavouriteController,
    GetMovieAllController,
    SearchController,
    FilterMovieAllController,
    GetMovieUpdatingAdminController,
    ViewStatisticsController,
    AddViewStatisticsController
} from '../controllers/MovieController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.get('/search/:search/:page', SearchController)
router.post('/add-movie', SendMovieController)
router.post('/add-movie-history', AddMovieHistoryController)
router.get('/view-statistics', ViewStatisticsController)
router.post('/add-view-statistics', AddViewStatisticsController)

router.get('/movie-waiting/:userId', GetMovieWaitingController)
router.get('/movie-waiting', GetMovieWaitingAdminController)

router.get('/movie-update', GetMovieUpdatingAdminController)
router.post('/approval', verifyToken, UpdateApprovalController)
router.get('/movie-history/:userId', GetMovieHistoryController)
router.get('/my-movie/:userId', GetMyMovieController)
router.get('/movie-detail/:movieId', GetMovieDetailController)
router.get('/all', GetMovieAllController)
router.post('/filter', FilterMovieAllController)

router.get('/movie-detail-favourite/:movieId', GetMovieDetailFavouriteController)
router.post('/add-favourite', AddFavouriteController)
router.delete('/delete-favourite/:favouriteId', DeleteFavouriteController)
router.get('/favourite/:userId/:movieId', GetFavouriteController)
router.post('/delete-history', DeleteMovieHistoryController)
router.delete('/delete-my-movie/:movieId', verifyToken, DeleteMyMovieController)
router.get('/my-favourite/:userId', GetMyFavouriteController)

export default router;