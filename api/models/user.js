import mongoose from 'mongoose';
import { emailRegex } from '../lib/stringTesters.js';
import bcrypt from 'bcrypt';
import mongooseHidden from 'mongoose-hidden';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    unique: [true, 'Email already exists in the database'],
    required: [true, 'cannot create user without email'],
    minlength: 5,
    maxlength: 30,
    validate: (email) => emailRegex.test(email),
  },
  password: {
    type: String,
    required: true,
    validate: (password) =>
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      ),
  },
  isAdmin: { type: Boolean },
});

userSchema.pre('save', function encryptPassword(next) {
  // ! If the password has changed...
  if (this.isModified('password')) {
    // ! Hashing the password
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
  // ! Tell mongoose to continue its lifecycle
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true } })
);

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
