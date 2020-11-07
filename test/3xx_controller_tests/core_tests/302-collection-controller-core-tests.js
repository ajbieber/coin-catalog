/**
 * @module test.302-collection-controller-core-tests
 *
 * @author Austin Bieber
 *
 * @description Tests the basic CRUD operations of the collection controller.
 */

// Node Modules
const crypto = require('crypto');

// NPM Modules
const chai = require('chai');

// Internal Modules
const UserController = require('../../../app/controllers/user-controller');
const CollectionController = require('../../../app/controllers/collection-controller');

// Define test data
const userObjData = {
    _id: 'testuser00',
    password: 'TestUser00!',
    tags: ['US', 'World'],
    email: 'testuser00@coins.com'
};

const collectionObjData = {
    name: 'Proof Coins',
    description: 'All coins with a proof finish',
    user: userObjData._id
};

let collectionID = null;


describe('302-collection-controller-core-tests', () => {
   before(async function() {
       await UserController.create(userObjData);
   });

   after(async function() {
       await UserController.remove(userObjData._id);
   });

   it('should create a new collection', testCreateCollection);
   it('should find a collection', testFindCollection);
   it('should update a collection', testUpdateCollection);
   it('should delete a collection', testRemoveCollection);
});

/**
 * @description Tests that a collection can be created via the collection controller.
 */
async function testCreateCollection() {
    // Create the collection
    const createdCollection = await CollectionController.create(userObjData._id, collectionObjData);
    collectionID = createdCollection._id;

    // Verify the fields match
    chai.expect(createdCollection.name).to.equal(collectionObjData.name);
    chai.expect(createdCollection.description).to.equal(collectionObjData.description);
    chai.expect(createdCollection.user).to.equal(userObjData._id);
}

/**
 * @descriptionTests that a collection can be found via the collection
 * controller.
 */
async function testFindCollection() {
    // Attempt to find the collection
    const foundCollection = await CollectionController.find(collectionID);

    // Verify the fields match
    chai.expect(foundCollection.name).to.equal(collectionObjData.name);
    chai.expect(foundCollection.description).to.equal(collectionObjData.description);
    chai.expect(foundCollection.user).to.equal(userObjData._id);
}

/**
 * @description Tests that a collection can be updated via the collection
 * controller.
 */
async function testUpdateCollection() {
    const updateCollectionObj = {
        description: 'UPDATED description'
    };

    // Update the collection
    const updatedCollection = await CollectionController.update(userObjData._id,
        collectionID, updateCollectionObj);

    // Verify the fields match
    chai.expect(updatedCollection.name).to.equal(collectionObjData.name);
    chai.expect(updateCollectionObj.description).to.equal(updateCollectionObj.description); // Updated field
    chai.expect(updatedCollection.user).to.equal(userObjData._id);
}

/**
 * @description Tests that a collection can be removed from the database. Attempts
 * to find the collection in the database to verify it was removed properly.
 */
async function testRemoveCollection() {
    // Delete the collection
    await CollectionController.remove(userObjData._id, collectionID);

    // Attempt to find the collection, expecting the result to be null
    chai.expect(await CollectionController.find(collectionID)).to.equal(null);
}
