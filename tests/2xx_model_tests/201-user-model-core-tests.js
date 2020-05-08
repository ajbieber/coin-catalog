/**
 * @module tests.201-user-model-core-tests
 *
 * @author Austin Bieber
 *
 * @description Tests the basic CRUD operations of the user model
 */

// Node Modules
const crypto = require('crypto');

// NPM Modules
const chai = require('chai');

// Internal Modules
const User = require('../../app/models/user');

describe('201-user-model-core-tests', () => {
  it('should create a new user', testCreateUser);
  it('should delete a user', testRemoveUser);
});

/**
 * @description Tests that a user can be created via the user model. Attempts to
 * find the user in the database to verify they were created properly.
 */
async function testCreateUser() {
  // Define the user
  const userObj = new User({
    _id: 'testuser00',
    password: 'TestUser00!',
    tags: ['US', 'World'],
    email: 'testuser00@coins.com'
  });
  // Create the user
  await userObj.save();

  // Find the user in the database
  const createdUser = await User.findById(userObj._id);

  // Verify the fields match
  chai.expect(createdUser._id).to.equal(userObj._id);
  chai.expect(createdUser.tags).to.have.members(userObj.tags);
  chai.expect(createdUser.email).to.equal(userObj.email);

  // Hash the user's password, and verify it matches the password stored in db
  const derivedKey = crypto.pbkdf2Sync('TestUser00!', 'testuser00', 1000, 32, 'sha256');
  const hashedPassword = derivedKey.toString('hex');
  chai.expect(createdUser.password).to.equal(hashedPassword);
}

/**
 * @description Tests that a user can be removed from the database. Attempts to
 * find the user in the database to verify they were removed properly.
 */
async function testRemoveUser() {
  const username = 'testuser00';

  // Delete the user
  await User.findByIdAndRemove(username);

  // Attempt to find the user, expecting the result to be null
  chai.expect(await User.findOne({ username: username })).to.equal(null);
}