/**
 * @module tests.20-collection-model-error-tests
 *
 * @author Austin Bieber
 *
 * @description Tests that errors occur when expected when attempting specific
 * CRUD operations via the Collection model.
 */

// NPM Modules
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Internal Modules
const Collection = require('../../../app/models/collection');

describe('202-collection-model-error-tests', () => {
  it('should fail creating a collection whose _id is invalid', testCreateCollectionIDInvalid);
  it('should fail creating a collection whose name is too short', testCreateCollectionNameTooShort);
  it('should fail creating a collection whose name is too long', testCreateCollectionNameTooLong);
});

/**
 * @description Tests that a collection fails to be created when the _id is
 * invalid.
 */
async function testCreateCollectionIDInvalid() {
  // Define the collection
  const collectionObj = new Collection({
    _id: 'Invalid ID',
    name: 'My Collection',
    description: 'This is my test collection.',
    user: 'testuser00'
  });

  try {
    // Create the collection
    await chai.expect(collectionObj.save()).to.be.rejectedWith('Collection '
      + 'validation failed: _id: _id must be a valid uuid.');
  }
  catch (error) {
    // If the assertion failed, ensure collection is removed from database
    await Collection.findByIdAndRemove(collectionObj._id);
  }
}

/**
 * @description Tests that a collection fails to be created when the name is
 * too short.
 */
async function testCreateCollectionNameTooShort() {
  // Define the collection
  const collectionObj = new Collection({
    name: 'A',
    description: 'This is my test collection.',
    user: 'testuser00'
  });

  try {
    // Create the collection
    await chai.expect(collectionObj.save()).to.be.rejectedWith('Collection '
      + 'validation failed: name: Name must be at least 2 characters long.');
  }
  catch (error) {
    // If the assertion failed, ensure collection is removed from database
    await Collection.findByIdAndRemove(collectionObj._id);
  }
}

/**
 * @description Tests that a collection fails to be created when the name is
 * too long.
 */
async function testCreateCollectionNameTooLong() {
  // Define the collection
  const collectionObj = new Collection({
    name: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP'
      + 'QRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789012345678901234',
    description: 'This is my test collection.',
    user: 'testuser00'
  });

  try {
    // Create the collection
    await chai.expect(collectionObj.save()).to.be.rejectedWith('Collection '
      + 'validation failed: name: Name must be less than 128 characters long.');
  }
  catch (error) {
    // If the assertion failed, ensure collection is removed from database
    await Collection.findByIdAndRemove(collectionObj._id);
  }
}