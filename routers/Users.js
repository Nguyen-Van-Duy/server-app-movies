import express from 'express';
import {CreateAccount, LoginController, GetUserController, GetFriendController, GetUserAllController} from "../controllers/UserController.js"
import verifyToken from "../middleware/auth.js"

const router = express.Router();

router.post('/create-account', CreateAccount)
router.get('/refresh', verifyToken, (req, res) => {
    res.json(req.dataAll)
})
router.post('/login', LoginController)
router.get('/user/:userId', GetUserController)
router.get('/user', GetUserAllController)


export default router;