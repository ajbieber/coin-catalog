/**
 * @module test.301-user-controller-core-tests
 *
 * @author Austin Bieber
 *
 * @description Tests the basic CRUD operations of the user controller.
 */

// Node Modules
const crypto = require('crypto');

// NPM Modules
const chai = require('chai');

// Internal Modules
const UserController = require('../../../app/controllers/user-controller');
// const User = require('../../../app/models/user');

describe('301-user-controller-core-tests', () => {
    it('should create a new user', testCreateUser);
    // it('should find a user', testFindUser);
    // it('should update a user', testUpdateUser);
    it('should delete a user', testRemoveUser);
});

/**
 * @description Tests that a user can be created via the user controller.
 */
async function testCreateUser() {
    // Define the user
    const userObj = {
        password: 'TestUser00!',
        tags: ['US', 'World'],
        email: 'testuser00@coins.com'
    };

    // Create the user
    const createdUser = await UserController.create(userObj);


    // Verify the fields match
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
    await UserController.remove(username);

    // Attempt to find the user, expecting the result to be null
    chai.expect(await UserController.find(username)).to.equal(null);
}