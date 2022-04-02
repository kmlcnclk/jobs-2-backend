import express from 'express';
import {
  getAllMessages,
  getMessage,
  getMessages,
  createMessage,
} from '../controllers/messageController.js';
import { getAccessToRoute } from '../middlewares/auth.js';

const messageRouter = express.Router();

messageRouter.get('/messages', [getAccessToRoute], getMessages);
messageRouter.get('/messagesAll', getAllMessages);
messageRouter.get('/:id', [getAccessToRoute], getMessage);
messageRouter.post('/create', [getAccessToRoute], createMessage);

export default messageRouter;
