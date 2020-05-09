/**
 * @module app.models.user
 *
 * @author Austin Bieber
 *
 * @description Defines the user database model.
 */

// Node Modules
const crypto = require('crypto');

// NPM Modules
const mongoose = require('mongoose');

// Internal Modules
const validate = require('../lib/validate');


const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    validate: validate.User._id
  },
  password: {
    type: String,
    validate: validate.User.password,
    required: true
  },
  tags: {
    type: [String]
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: validate.User.email
  }
});

/**
 * @description Pre Middleware which is triggered on the save call. Checks to
 * see if the password has been modified, and if so hashes it.
 */
UserSchema.pre('save', function(next) {
  // If the password has been updated
  if (this.isModified('password')) {
    // Hash the password
    const derivedKey = crypto.pbkdf2Sync(this.password, this._id.toString(), 1000, 32, 'sha256');
    this.password = derivedKey.toString('hex');
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);