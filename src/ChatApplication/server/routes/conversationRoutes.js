
import express from 'express';


import {getConversation, newConv} from '../controller/conversationController.js';
const router = express.Router();
router.post('/conversations', newConv);
router.get('/conversations/:userId', getConversation);

export default router;