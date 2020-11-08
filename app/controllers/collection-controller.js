/**
 * @modules app.controllers.collection-controller
 *
 * @author Austin Bieber
 *
 * @description Defines CRUD operations for collections.
 */

// Internal Modules
const Coin = require('../models/coin');
const Collection = require('../models/collection');
const User = require('../models/user');

/**
 * @description Creates a new collection in the database.
 * @param {string} userID: The user's ID/username.
 * @param {object} newCollectionData: The new collection's data.
 * @returns {Promise<Collection>}
 */
async function create(userID, newCollectionData) {
	// Verify the user exists
	const user = await User.findById(userID);
	if (user === null) {
		throw new Error(`User ${userID} does not exist.`);
	}

	// Create the collection
	const collection = new Collection(newCollectionData);
	await collection.save();

	return collection;
}

/**
 * @description Finds a collection by its ID and returns it.
 * @param {string} collectionID: The ID of the collection to find.
 * @returns {Promise<Collection>}
 */
async function find(collectionID) {
	return Collection.findById(collectionID);
}

/**
 * @description Finds and updates a collection.
 * @param {string} userID: The id of the user who owns the collection.
 * @param {string} collectionID: The id of the collection to update.
 * @param {object} updateObj: An object containing updates to the collection
 * @returns {Promise<Collection>}
 */
async function update(userID, collectionID, updateObj) {
	// Verify the user exists
	if (await User.findById(userID) === null) {
		throw new Error(`User ${userID} does not exist.`);
	}

	// Find the collection
	const collection = await Collection.findById(collectionID);

	// Verify the user owns the collections
	if (collection.user !== userID) {
		throw new Error(`User ${userID} cannot update collection ${collectionID}.`);
	}

	// Update each field in the collection
	Object.keys(updateObj).forEach((key) => {
		// Ensure the property exists
		if (collection._doc.hasOwnProperty(key)) {
			collection[key] = updateObj[key];
		}
	});

	// Update the collection
	await collection.save();

	// Return the updated collection
	return Collection.findById(collectionID);
}

async function remove(userID, collectionID) {
	// Find all coins apart of this collection
	const coins = await Coin.find({ user: userID, collection: collectionID });

	// Find coins only apart of this collection
	const coinsToDelete = [];
	coins.forEach((coin) => {
		if (coin.collections.length === 1 && coin.collections[0] === collectionID) {
			coinsToDelete.push(coin._id);
		}
	});

	// Delete coins
	await Coin.deleteMany({ _id: coinsToDelete });

	// Delete the collection
	await Collection.deleteOne({ user: userID, _id: collectionID });
}

module.exports = {
	create,
	find,
	update,
	remove
};