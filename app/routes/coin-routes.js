/**
 * @module app.routes.coin-routes
 *
 * @author Austin Bieber
 *
 * @description Implements routes for the coin controller
 */

// NPM Modules
const express = require('express');

// Internal Modules
const auth = require('../lib/auth');
const { NotFoundError } = require('../lib/error');
const { respond } = require('../lib/utils');
const CoinController = require('../controllers/coin-controller');

// Init router
const router = express.Router();

/**
 * @description API route for creating a new coin
 */
router.post('/', auth, async function(req, res) {
	try {
		// Create the coin
		const coin = await CoinController.create(req.user._id, req.body);
		respond(res, coin);
	}
	catch (error) {
		respond(res, error);
	}
});

router.route('/:id')
	/**
	 * @description API route for retrieving a coin
	 */
	.get(async function(req, res) {
		try {
			// Find the coin
			const coin = await CoinController.find(req.params.id);

			// If no coin was found, return a 404
			if (coin === null) {
				const error = new NotFoundError(`Coin [${req.params.id}] was not found.`);
				respond(res, error);
			} else {
				respond(res, coin);
			}
		}
		catch (error) {
			respond(res, error);
		}
	})

	/**
	 * @description API route for updating an existing coin
	 */
	.patch(auth, async function(req, res) {
		try {
			// Update the coin
			const updatedCoin = await CoinController.update(req.user._id, req.params.id, req.body);
			respond(res, updatedCoin);
		}
		catch (error) {
			respond(res, error);
		}
	})

	/**
	 * @description API route for deleting a coin
	 */
	.delete(auth, async function(req, res) {
		try {
			// Delete the coin
			await CoinController.remove(req.user._id, req.params.id);
			respond(res, "");
		}
		catch (error) {
			respond(res, error);
		}
	});

module.exports = router;