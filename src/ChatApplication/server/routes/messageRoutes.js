
import express from 'express';


import {addMessage, getMessage} from '../controller/messageController.js';
const router = express.Router();
router.post('/messages', addMessage);
router.get('/messages/:conversationId', getMessage);

export default router;