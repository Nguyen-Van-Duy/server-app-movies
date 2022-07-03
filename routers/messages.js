import express from 'express';
import {SendMessageController, 
    GetMessageController, 
    SendInvitationController, 
    GetInvitationController, 
    DeleteInvitationController
} from '../controllers/MessageController.js'

const router = express.Router();

router.get('/:conversationId', GetMessageController)
router.post('/', SendMessageController)
router.get('/invitation/:invitationId', GetInvitationController)
router.post('/invitation', SendInvitationController)
router.delete('/invitation/:invitationId', DeleteInvitationController)

export default router;