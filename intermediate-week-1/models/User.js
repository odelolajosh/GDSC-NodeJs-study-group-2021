const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const constants = require('../utils/constants');

const { USER } = constants.mongooseModels;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // If password is not modified then skip
  if (!this.isModified('password')) {
    return next();
  }

  const user = this;

  try {
    // if password is modified then change hash the password and save it.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    // also remove the passwordConfirm.
    user.passwordConfirm = '';
  } catch (err) {
    return next(err);
  }

  next();
});

module.exports = mongoose.model(USER, userSchema);
