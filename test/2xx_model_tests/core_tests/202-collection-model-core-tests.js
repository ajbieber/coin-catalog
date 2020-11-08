/**
 * @module test.202-collection-model-core-tests
 *
 * @author Austin Bieber
 *
 * @description Tests the basic CRUD operations of the collection model
 */

// NPM Modules
const chai = require('chai');

// Internal Modules
const Collection = require('../../../app/models/collection');

// Test variables
let collectionID = null;

describe('202-collection-model-core-tests', () => {
	it('should create a new collection', testCreateCollection);
	it('should delete a collection', testRemoveCollection);
});

/**
 * @description Tests that a collection can be created via the collection model.
 * Attempts to find the collection in the database to verify is was created
 * properly.
 */
async function testCreateCollection() {
	// Define the collection
	const collectionObj = new Collection({
		name: 'My Collection',
		description: 'This is my test collection.',
		user: 'testuser00'
	});
	// Create the collection
	await collectionObj.save();

	// Find the collection in the database
	const createdCollection = await Collection.findById(collectionObj._id);
	collectionID = createdCollection._id;

	// Verify the fields match
	chai.expect(createdCollection.name).to.equal(collectionObj.name);
	chai.expect(createdCollection.description).to.equal(collectionObj.description);
	chai.expect(createdCollection.user).to.equal(collectionObj.user);
}

/**
 * @description Tests that a collection can be removed from the database.
 * Attempts to find the collection in the database to verify is was removed
 * properly.
 */
async function testRemoveCollection() {
	// Delete the collection
	await Collection.findByIdAndRemove(collectionID);

	// Attempt to find the collection, expecting the result to be null
	chai.expect(await Collection.findOne({ _id: collectionID })).to.equal(null);
}

