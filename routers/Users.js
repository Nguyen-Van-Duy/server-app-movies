import express from 'express';
import {UserController, LoginController, GetUserController, GetFriendController, GetUserAllController} from "../controllers/UserController.js"

const router = express.Router();

router.post('/user', UserController)
router.post('/login', LoginController)
router.get('/user/:userId', GetUserController)
router.get('/user/All', GetUserAllController)


export default router;