import express from 'express';
import userRouter from './userRouter.js';
import messageRouter from './messageRouter.js';

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/message', messageRouter);

export default mainRouter;
