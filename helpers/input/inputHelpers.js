import bcrypt from 'bcryptjs';

// Checking email and password
export const validateUserInput = (email, password) => {
  return email && password;
};

// Compare password and hashPassword
export const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
