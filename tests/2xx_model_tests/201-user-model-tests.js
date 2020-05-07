/**
 * @module tests.201-user-model-tests
 *
 * @author Austin Bieber
 *
 * @description Tests the basic CRUD operations of the user model
 */

// NPM Modules
const chai = require('chai');
const crypto= require('crypto');

// Internal Modules
const User = require('../../app/models/user');

describe('201-user-model-tests', () => {
  it('should create a new user', testCreateUser);
  it('should delete a user', testRemoveUser);
});

async function testCreateUser() {
  const userObj = new User({
    _id: 'testuser00',
    password: 'TestUser00!',
    tags: ['US', 'World'],
    email: 'testuser00@coins.com'
  });

  const newUser = await userObj.save();

  chai.expect(newUser._id).to.equal(userObj._id);

  const derivedKey = crypto.pbkdf2Sync('TestUser00!', 'testuser00', 1000, 32, 'sha256');
  const hashedPassword = derivedKey.toString('hex');
  chai.expect(newUser.password).to.equal(hashedPassword);
}

async function testRemoveUser() {
  const username = 'testuser00';

  await User.findByIdAndRemove(username);

  chai.expect(await User.findOne({ username: username })).to.equal(null);
}