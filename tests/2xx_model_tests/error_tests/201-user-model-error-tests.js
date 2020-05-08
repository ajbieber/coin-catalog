/**
 * @module tests.201-user-model-error-tests
 *
 * @author Austin Bieber
 *
 * @description Tests that error occur when expected when attempting specific
 * CRUD operations via the User model.
 */

// NPM Modules
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Internal Modules
const User = require('../../../app/models/user');

describe('201-user-model-error-tests', () => {
  it('should fail creating a user whose username is too short', testCreateUserUsernameTooShort);
  it('should fail creating a user whose username is too long', testCreateUserUsernameTooLong);
});

/**
 * @description Tests that a user fails to be created when their username is too
 * short.
 */
async function testCreateUserUsernameTooShort() {
  // Define the user
  const userObj = new User({
    _id: 'ab',
    password: 'TestUser00!',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' _id: Username must be at least 4 characters long.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}

/**
 * @description Tests that a user fails to be created when their username is too
 * long.
 */
async function testCreateUserUsernameTooLong() {
  // Define the user
  const userObj = new User({
    _id: 'abcdefghigklmnopqrstuvwxyz0123456',
    password: 'TestUser00!',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' _id: Username must be less than 32 characters long.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}