import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import { getMessageHistory, sendMessage } from '../controllers/messageController.js';
const messageRouter = express.Router();

// Route to send a message (Protected)
messageRouter.post('/send', auth, sendMessage);

// Route to get message history between two users (Protected)
messageRouter.get('/history/:userId/:friendId', auth, getMessageHistory);

export default messageRouter;