import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
  },
  firstname: {
    type: String,
    default: '',
  },
  lastname: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter a email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please enter a email address'],
    minlength: [6, 'Password must be a minimum of 6 characters'],
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Generate Json Web Token From User
UserSchema.methods.generateJwtFromUser = function () {
  const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;
  const JWT_EXPIRE = process.env.JWT_EXPIRE;

  const payload = {
    id: this._id,
    username: this.username,
  };

  const token = jwt.sign(payload, JSON_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

// Password Hashing
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model('User', UserSchema);
