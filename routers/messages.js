import express from 'express';
import {SendMessageController, GetMessageController, SendInvitationController} from '../controllers/MessageController.js'

const router = express.Router();

router.get('/:conversationId', GetMessageController)
router.post('/', SendMessageController)
router.post('/invitation', SendInvitationController)

export default router;