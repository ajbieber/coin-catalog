/**
 * @module test.203-coin-model-core-tests
 *
 * @author Austin Bieber
 *
 * @description Tests the basic CRUD operations of the coin model
 */

// NPM Modules
const chai = require('chai');

// Internal Modules
const Coin = require('../../../app/models/coin');

// Test variables
let coinID = null;

describe('203-coin-model-core-tests', () => {
  it('should create a new coin', testCreateCoin);
  it('should delete a coin', testRemoveCoin);
});

/**
 * @description Tests that a coin can be created via the coin model. Attempts to
 * find the coin in the database to verify is was created properly.
 */
async function testCreateCoin() {
  // Define the coin
  const coinObj = new Coin({
    country: 'United States',
    year: 1909,
    denomType: 'Cent',
    denomAmount: 1,
    composition: ['Copper', 'Zinc'],
    dateAcquired: new Date('Oct 23 1995'),
    purchasePrice: 2.30,
    dateSold: null,
    sellingPrice: null,
    grade: 65,
    grader: 'pcgs',
    value: 500.00,
    tags: ['US', 'Rare', 'High Grade'],
    proof: false,
    notes: '1909 VDB',
    user: 'testuser00',
    collections: ['default']
  });
  // Create the coin
  await coinObj.save();

  // Find the coin in the database
  const createdCoin = await Coin.findById(coinObj._id);
  coinID = createdCoin._id;

  // Verify the fields match
  chai.expect(createdCoin.country).to.equal(coinObj.country);
  chai.expect(createdCoin.year).to.equal(coinObj.year);
  chai.expect(createdCoin.denomType).to.equal(coinObj.denomType);
  chai.expect(createdCoin.denomAmount).to.equal(coinObj.denomAmount);
  chai.expect(createdCoin.composition).to.have.members(coinObj.composition);
  chai.expect(createdCoin.dateAcquired).to.deep.equal(coinObj.dateAcquired);
  chai.expect(createdCoin.purchasePrice).to.equal(coinObj.purchasePrice);
  chai.expect(createdCoin.dateSold).to.deep.equal(coinObj.dateSold);
  chai.expect(createdCoin.sellingPrice).to.equal(coinObj.sellingPrice);
  chai.expect(createdCoin.grade).to.equal(coinObj.grade);
  chai.expect(createdCoin.grader).to.equal(coinObj.grader);
  chai.expect(createdCoin.value).to.equal(coinObj.value);
  chai.expect(createdCoin.tags).to.have.members(coinObj.tags);
  chai.expect(createdCoin.proof).to.equal(coinObj.proof);
  chai.expect(createdCoin.notes).to.equal(coinObj.notes);
  chai.expect(createdCoin.user).to.equal(coinObj.user);
  chai.expect(createdCoin.collections).to.have.members(coinObj.collections);
}

/**
 * @description Tests that a coin can be removed from the database. Attempts to
 * find the coin in the database to verify is was removed properly.
 */
async function testRemoveCoin() {
  // Delete the coin
  await Coin.findByIdAndRemove(coinID);

  // Attempt to find the coin, expecting the result to be null
  chai.expect(await Coin.findOne({ _id: coinID })).to.equal(null);
}