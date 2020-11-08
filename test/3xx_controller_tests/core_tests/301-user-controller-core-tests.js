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

// Define test data
const userObjData = {
	_id: 'testuser00',
	password: 'TestUser00!',
	tags: ['US', 'World'],
	email: 'testuser00@coins.com'
};

describe('301-user-controller-core-tests', () => {
	it('should create a new user', testCreateUser);
	it('should find a user', testFindUser);
	it('should update a user', testUpdateUser);
	it('should delete a user', testRemoveUser);
});

/**
 * @description Tests that a user can be created via the user controller.
 */
async function testCreateUser() {
	// Create the user
	const createdUser = await UserController.create(userObjData);

	// Verify the fields match
	chai.expect(createdUser.tags).to.have.members(userObjData.tags);
	chai.expect(createdUser.email).to.equal(userObjData.email);

	// Hash the user's password, and verify it matches the password stored in db
	const derivedKey = crypto.pbkdf2Sync(userObjData.password, userObjData._id, 1000, 32, 'sha256');
	const hashedPassword = derivedKey.toString('hex');
	chai.expect(createdUser.password).to.equal(hashedPassword);
}

/**
 * @description Tests that a user can be found via the user controller.
 */
async function testFindUser() {
	// Attempt to find the user
	const foundUser = await UserController.find(userObjData._id);

	// Verify the fields match
	chai.expect(foundUser.tags).to.have.members(userObjData.tags);
	chai.expect(foundUser.email).to.equal(userObjData.email);

	// Hash the user's password, and verify it matches the password stored in db
	const derivedKey = crypto.pbkdf2Sync(userObjData.password, userObjData._id, 1000, 32, 'sha256');
	const hashedPassword = derivedKey.toString('hex');
	chai.expect(foundUser.password).to.equal(hashedPassword);
}

/**
 * @description Tests that a user can be updated via the user controller.
 */
async function testUpdateUser() {
	const updateUserObj = {
		email: 'testuser00_updated@coins.com'
	};

	// Update the user
	const updatedUser = await UserController.update(userObjData._id, updateUserObj);

	// Verify the fields match
	chai.expect(updatedUser.tags).to.have.members(userObjData.tags);
	chai.expect(updatedUser.email).to.equal(updateUserObj.email); // Updated field

	// Hash the user's password, and verify it matches the password stored in db
	const derivedKey = crypto.pbkdf2Sync(userObjData.password, userObjData._id, 1000, 32, 'sha256');
	const hashedPassword = derivedKey.toString('hex');
	chai.expect(updatedUser.password).to.equal(hashedPassword);
}

/**
 * @description Tests that a user can be removed from the database. Attempts to
 * find the user in the database to verify they were removed properly.
 */
async function testRemoveUser() {
	// Delete the user
	await UserController.remove(userObjData._id);

	// Attempt to find the user, expecting the result to be null
	chai.expect(await UserController.find(userObjData._id)).to.equal(null);
}