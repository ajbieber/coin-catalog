/**
 * @module app.models.user
 *
 * @author Austin Bieber
 *
 * @description Defines the user database model
 */

// Node Modules
const crypto = require('crypto');

// NPM Modules
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  tags: {
    type: [String]
  },
  email: {
    type: String,
    unique: true
  }
});

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