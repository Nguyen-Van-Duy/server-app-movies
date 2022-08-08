import express from 'express';
import { ConversationController, GetIdConversation, GroupConversationController, DeleteConversation, GetGroupConversation, ChangeNotificationController } from '../controllers/ConversationController.js';

const router = express.Router();

router.post('/add-friend', ConversationController)
router.post('/change-notification', ChangeNotificationController)
router.post('/add-group', GroupConversationController)
router.get('/:userId', GetIdConversation)
router.get('/group/:userId', GetGroupConversation)
router.delete('/:conversationId', DeleteConversation)

export default router;