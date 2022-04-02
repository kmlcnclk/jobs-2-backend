// Generate cookie to user
export const sendJwtToClient = (user, res, value, messages) => {
  const token = user.generateJwtFromUser();
  const JWT_COOKIE = process.env.JWT_COOKIE;
  const NODE_ENV = process.env.NODE_ENV;

  return res
    .status(value == 'register' ? 201 : 200)
    .cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: NODE_ENV === 'development' ? false : true,
    })
    .json({
      success: true,
      access_token: token,
      data: { user, messages: value == 'register' ? [] : messages },

      message:
        value == 'register'
          ? 'User successfully created'
          : 'User successfully logged in',
    });
};

// Is token included ?
export const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  );
};

// Get access token from header
export const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization?.split(' ')[1];
  return access_token;
};
