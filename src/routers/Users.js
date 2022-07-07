import express from 'express';
import {CreateAccount, LoginController, GetUserController, GetDataInfo, GetUserAllController, GetAdminController} from "../controllers/UserController.js"
import verifyToken from "../middleware/auth.js"

const router = express.Router();

router.post('/create-account', CreateAccount)
router.get('/refresh', verifyToken, GetDataInfo)
router.post('/login', LoginController)
router.get('/user/:userId', GetUserController)
router.get('/admin', GetAdminController)
router.get('/user', GetUserAllController)


export default router;