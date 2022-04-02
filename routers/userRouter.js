import express from 'express';
import { register, login, logout } from '../controllers/userController.js';
import { isTheUserRegistered, getAccessToRoute } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', [isTheUserRegistered], register);
userRouter.post('/login', login);
userRouter.get('/logout', [getAccessToRoute], logout);

export default userRouter;
