import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import CustomError from '../errors/CustomError.js';

import {
  isTokenIncluded,
  getAccessTokenFromHeader,
} from '../helpers/auth/token_helpers.js';
import jwt from 'jsonwebtoken';

// Is the user registered ?
export const isTheUserRegistered = expressAsyncHandler(
  async (req, res, next) => {
    const { email, username } = req.body;

    const u1 = await User.findOne({ email });
    if (u1) {
      throw new CustomError(
        'Email already exists. Email required to be unique',
        400
      );
    }

    const u2 = await User.findOne({ username });
    if (u2) {
      throw new CustomError(
        'Username already exists. Username required to be unique',
        400
      );
    }

    next();
  }
);

// Get access to route
export const getAccessToRoute = (req, res, next) => {
  const { JSON_SECRET_KEY } = process.env;

  if (!isTokenIncluded(req)) {
    return next(
      new CustomError('You are not authorized to access this route', 401)
    );
  }

  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, JSON_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError('You are not authorized to access this route', 401)
      );
    }

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };
    next();
  });
};
