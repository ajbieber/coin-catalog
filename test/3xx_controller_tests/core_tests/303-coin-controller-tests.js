/**
 * @module test.303-coin-controller-core-tests
 *
 * @author Austin Bieber
 *
 * @description Tests the basic CRUD operations of the coin controller.
 */

// NPM Modules
const chai = require('chai');

// Internal Modules
const CoinController = require('../../../app/controllers/coin-controller');
const CollectionController = require('../../../app/controllers/collection-controller');
const UserController = require('../../../app/controllers/user-controller');

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

const coinObjData = {
	country: 'United States',
	denomType: 'Cents',
	denomAmount: 25,
	year: 1964,
	composition: ['silver', 'copper', 'nickel'],
	dateAcquired: new Date('October 31, 2019'),
	purchasePrice: 25.00,
	dateSold: null,
	sellingPrice: null,
	value: 33.00,
	grade: 66,
	grader: 'PCGS',
	tags: ['silver', 'proof', 'US', 'graded'],
	proof: true,
	notes: 'N/A',
	collections: []
};

let collectionID = '';
let coinID = '';

describe('303-coin-controller-core-tests', () => {
	before(async function() {
		await UserController.create(userObjData);
		const collection = await CollectionController.create(userObjData._id, collectionObjData);
		collectionID = collection._id;
		coinObjData.collections.push(collectionID);
	});

	after(async function() {
		await UserController.remove(userObjData._id);
	});

	it('should create a new coin', testCreateCoin);
	it('should find a coin', testFindCoin);
	it('should update a coin', testUpdateCoin);
	it('should delete a coin', testRemoveCoin);
});

/**
 * @description Tests that a coin can be created via the coin controller.
 */
async function testCreateCoin() {
	// Create the coin
	const createdCoin = await CoinController.create(userObjData._id, coinObjData);
	coinID = createdCoin._id;

	// Verify the fields match
	chai.expect(createdCoin.country).to.equal(coinObjData.country);
	chai.expect(createdCoin.denomType).to.equal(coinObjData.denomType);
	chai.expect(createdCoin.denomAmount).to.equal(coinObjData.denomAmount);
	chai.expect(createdCoin.year).to.equal(coinObjData.year);
	chai.expect(createdCoin.composition).to.eql(coinObjData.composition);
	chai.expect(createdCoin.dateAcquired).to.eql(coinObjData.dateAcquired);
	chai.expect(createdCoin.purchasePrice).to.equal(coinObjData.purchasePrice);
	chai.expect(createdCoin.dateSold).to.eql(coinObjData.dateSold);
	chai.expect(createdCoin.sellingPrice).to.equal(coinObjData.sellingPrice);
	chai.expect(createdCoin.value).to.equal(coinObjData.value);
	chai.expect(createdCoin.grade).to.equal(coinObjData.grade);
	chai.expect(createdCoin.grader).to.equal(coinObjData.grader);
	chai.expect(createdCoin.tags).to.eql(coinObjData.tags);
	chai.expect(createdCoin.proof).to.equal(coinObjData.proof);
	chai.expect(createdCoin.notes).to.equal(coinObjData.notes);
	chai.expect(createdCoin.user).to.equal(userObjData._id);
	chai.expect(createdCoin.collections).to.eql([collectionID]);
}

/**
 * @description Test that a coin can be found via the coin controller.
 */
async function testFindCoin() {
	// Attempt the find the coin
	const foundCoin = await CoinController.find(coinID);

	// Verify the fields match
	chai.expect(foundCoin.country).to.equal(coinObjData.country);
	chai.expect(foundCoin.denomType).to.equal(coinObjData.denomType);
	chai.expect(foundCoin.denomAmount).to.equal(coinObjData.denomAmount);
	chai.expect(foundCoin.year).to.equal(coinObjData.year);
	chai.expect(foundCoin.composition).to.eql(coinObjData.composition);
	chai.expect(foundCoin.dateAcquired).to.eql(coinObjData.dateAcquired);
	chai.expect(foundCoin.purchasePrice).to.equal(coinObjData.purchasePrice);
	chai.expect(foundCoin.dateSold).to.eql(coinObjData.dateSold);
	chai.expect(foundCoin.sellingPrice).to.equal(coinObjData.sellingPrice);
	chai.expect(foundCoin.value).to.equal(coinObjData.value);
	chai.expect(foundCoin.grade).to.equal(coinObjData.grade);
	chai.expect(foundCoin.grader).to.equal(coinObjData.grader);
	chai.expect(foundCoin.tags).to.eql(coinObjData.tags);
	chai.expect(foundCoin.proof).to.equal(coinObjData.proof);
	chai.expect(foundCoin.notes).to.equal(coinObjData.notes);
	chai.expect(foundCoin.user).to.equal(userObjData._id);
	chai.expect(foundCoin.collections).to.eql([collectionID]);
}

/**
 * @description Tests that a coin can be updated via the coin controller.
 */
async function testUpdateCoin() {
	const updateCoinObj = {
		country: 'Canada'
	};

	// Update the coin
	const updatedCoin = await CoinController.update(userObjData._id, coinID,
		updateCoinObj);

	// Verify the fields match
	chai.expect(updatedCoin.country).to.equal(updateCoinObj.country); // Updated field
	chai.expect(updatedCoin.denomType).to.equal(coinObjData.denomType);
	chai.expect(updatedCoin.denomAmount).to.equal(coinObjData.denomAmount);
	chai.expect(updatedCoin.year).to.equal(coinObjData.year);
	chai.expect(updatedCoin.composition).to.eql(coinObjData.composition);
	chai.expect(updatedCoin.dateAcquired).to.eql(coinObjData.dateAcquired);
	chai.expect(updatedCoin.purchasePrice).to.equal(coinObjData.purchasePrice);
	chai.expect(updatedCoin.dateSold).to.eql(coinObjData.dateSold);
	chai.expect(updatedCoin.sellingPrice).to.equal(coinObjData.sellingPrice);
	chai.expect(updatedCoin.value).to.equal(coinObjData.value);
	chai.expect(updatedCoin.grade).to.equal(coinObjData.grade);
	chai.expect(updatedCoin.grader).to.equal(coinObjData.grader);
	chai.expect(updatedCoin.tags).to.eql(coinObjData.tags);
	chai.expect(updatedCoin.proof).to.equal(coinObjData.proof);
	chai.expect(updatedCoin.notes).to.equal(coinObjData.notes);
	chai.expect(updatedCoin.user).to.equal(userObjData._id);
	chai.expect(updatedCoin.collections).to.eql([collectionID]);
}

/**
 * @description Tests that a coin can be removed from the database. Attempts to
 * find the coin in the database to verify it was removed properly.
 */
async function testRemoveCoin() {
	// Delete the coin
	await CoinController.remove(userObjData._id, coinID);

	// Attempt to find the coin, expecting the result to be null
	chai.expect(await CoinController.find(coinID)).to.equal(null);
}
