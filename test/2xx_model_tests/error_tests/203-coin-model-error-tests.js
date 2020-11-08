/**
 * @module tests.20-coin-model-error-tests
 *
 * @author Austin Bieber
 *
 * @description Tests that errors occur when expected when attempting specific
 * CRUD operations via the Coin model.
 */

// NPM Modules
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Internal Modules
const Coin = require('../../../app/models/coin');

describe('203-coin-model-error-tests', () => {
	it('should fail creating a coin whose _id is invalid', testCreateCoinIDInvalid);
	it('should fail creating a coin whose denomination amount is 0 or less', testCreateCoinDenomAmountTooSmall);
	it('should fail creating a coin whose grade is outside the Sheldon scale', testCreateCoinGradeOutsideRange);
	it('should fail creating a coin whose grader is not well known', testCreateCoinGraderUnknown);
});

/**
 * @description Tests that a coin fails to be created when the _id is
 * invalid.
 */
async function testCreateCoinIDInvalid() {
	// Define the coin
	const coinObj = new Coin({
		_id: 'Invalid ID',
		country: 'United States',
		denomType: 'Cent',
		denomAmount: 1,
		year: 1909,
		user: 'testuser00',
		collections: ['default']
	});

	try {
		// Create the coin
		await chai.expect(coinObj.save()).to.be.rejectedWith('Coin validation '
      + 'failed: _id: _id must be a valid uuid.');
	}
	catch (error) {
		// If the assertion failed, ensure coin is removed from database
		await Coin.findByIdAndRemove(coinObj._id);
	}
}

/**
 * @description Tests that a coin fails to be created when the denomination
 * amount is 0 or less.
 */
async function testCreateCoinDenomAmountTooSmall() {
	// Define the coin
	const coinObj = new Coin({
		country: 'United States',
		denomType: 'Cent',
		denomAmount: 0,
		year: 1909,
		user: 'testuser00',
		collections: ['default']
	});

	try {
		// Create the coin
		await chai.expect(coinObj.save()).to.be.rejectedWith('Coin validation '
      + 'failed: denomAmount: Denomination amount must be greater than 0.');
	}
	catch (error) {
		// If the assertion failed, ensure coin is removed from database
		await Coin.findByIdAndRemove(coinObj._id);
	}
}

/**
 * @description Tests that a coin fails to be created when the grade is outside
 * the Sheldon scale range of 1-70
 */
async function testCreateCoinGradeOutsideRange() {
	// Define the coin
	const coinObj = new Coin({
		country: 'United States',
		denomType: 'Cent',
		denomAmount: 1,
		year: 1909,
		grade: 73,
		grader: 'pcgs',
		user: 'testuser00',
		collections: ['default']
	});

	try {
		// Create the coin
		await chai.expect(coinObj.save()).to.be.rejectedWith('Coin validation '
      + 'failed: grade: Grade must be between 1 and 70.');
	}
	catch (error) {
		// If the assertion failed, ensure coin is removed from database
		await Coin.findByIdAndRemove(coinObj._id);
	}
}

/**
 * @description Tests that a coin fails to be created when the grader is not
 * known.
 */
async function testCreateCoinGraderUnknown() {
	// Define the coin
	const coinObj = new Coin({
		country: 'United States',
		denomType: 'Cent',
		denomAmount: 0,
		year: 1909,
		grade: 62,
		grader: 'fake-grader',
		user: 'testuser00',
		collections: ['default']
	});

	try {
		// Create the coin
		await chai.expect(coinObj.save()).to.be.rejectedWith('Coin validation '
      + 'failed: grader: Grader must be a known and certified coin grader or self.');
	}
	catch (error) {
		// If the assertion failed, ensure coin is removed from database
		await Coin.findByIdAndRemove(coinObj._id);
	}
}