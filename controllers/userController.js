import expressAsyncHandler from 'express-async-handler';
import CustomError from '../errors/CustomError.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
import { sendJwtToClient } from '../helpers/auth/token_helpers.js';
import {
  validateUserInput,
  comparePassword,
} from '../helpers/input/inputHelpers.js';

export const register = expressAsyncHandler(async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username) throw new CustomError('Username field is required!', 400);
  if (!email) throw new CustomError('Email field is required!', 400);
  if (!password) throw new CustomError('Password field is required!', 400);

  const user = await User.create({
    email,
    password,
    username,
    firstname: firstname && true,
    lastname: lastname && true,
  });

  sendJwtToClient(user, res, 'register');
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError('Please check your Inputs', 400));
  }

  const user1 = await User.findOne({ email }).select('+password');

  if (!comparePassword(password, user1.password)) {
    return next(new CustomError('Please check your credentials', 400));
  }

  const user = await User.findOne({ email });

  const messages = await Message.find({ receiver_id: user._id });

  sendJwtToClient(user, res, 'login', messages);
});

export const logout = expressAsyncHandler(async (req, res) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === 'development' ? false : true,
    })
    .json({
      success: true,
      message: 'Logout Successful',
    });
});
