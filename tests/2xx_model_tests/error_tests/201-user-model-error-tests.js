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
  it('should fail creating a user whose password is too short', testCreateUserPasswordTooShort);
  it('should fail creating a user whose password is too long', testCreateUserPasswordTooLong);
  it('should fail creating a user whose password doesn\'t contain a lowercase'
    + ' letter', testCreateUserPasswordNoLowercase);
  it('should fail creating a user whose password doesn\'t contain an uppercase'
    + ' letter', testCreateUserPasswordNoUppercase);
  it('should fail creating a user whose password doesn\'t contain a number', testCreateUserPasswordNoNumber);
  it('should fail creating a user whose password doesn\'t contain a special'
    + ' character', testCreateUserPasswordNoSpecialCharacter);
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

/**
 * @description Tests that a user fails to be created when their password is too
 * short.
 */
async function testCreateUserPasswordTooShort() {
  // Define the user
  const userObj = new User({
    _id: 'testuser00',
    password: 'Abc123!',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' password: Password must be at least 8 characters long.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}

/**
 * @description Tests that a user fails to be created when their password is too
 * long.
 */
async function testCreateUserPasswordTooLong() {
  // Define the user
  const userObj = new User({
    _id: 'testuser00',
    password: 'Abcdefghigklmnopqrstuvwxyz012345!',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' password: Password must be less than 32 characters long.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}

/**
 * @description Tests that a user fails to be created when their password does
 * not contain a lowercase letter.
 */
async function testCreateUserPasswordNoLowercase() {
  // Define the user
  const userObj = new User({
    _id: 'testuser00',
    password: 'ABC123!!',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' password: Password must contain at least one lowercase letter.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}

/**
 * @description Tests that a user fails to be created when their password does
 * not contain an uppercase letter.
 */
async function testCreateUserPasswordNoUppercase() {
  // Define the user
  const userObj = new User({
    _id: 'testuser00',
    password: 'abc123!!',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' password: Password must contain at least one uppercase letter.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}

/**
 * @description Tests that a user fails to be created when their password does
 * not contain a number.
 */
async function testCreateUserPasswordNoNumber() {
  // Define the user
  const userObj = new User({
    _id: 'testuser00',
    password: 'ABCabc!!',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' password: Password must contain at least one number.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}

/**
 * @description Tests that a user fails to be created when their password does
 * not contain a special character.
 */
async function testCreateUserPasswordNoSpecialCharacter() {
  // Define the user
  const userObj = new User({
    _id: 'testuser00',
    password: 'ABCabc123',
    tags: ['US', 'World'],
    email: 'test00@coins.com'
  });

  // Create the user
  await chai.expect(userObj.save()).to.be.rejectedWith('User validation failed:'
    + ' password: Password must contain at least one special character.');

  // TODO: Add logic to ensure that if this test fails and user is created, they are deleted from DB
}