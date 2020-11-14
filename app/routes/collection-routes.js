/**
 * @module app.routes.collection-routes
 *
 * @author Austin Bieber
 *
 * @description Implements routes for the collection controller.
 */

// NPM Modules
const express = require('express');

// Internal Modules
const auth = require('../lib/auth');
const { UnauthorizedError, NotFoundError } = require('../lib/error');
const logger = require('../lib/logger');
const { respond } = require('../lib/utils');
const CollectionController = require('../controllers/collection-controller');

// Init router
const router = express.Router();

/**
 * @description API route for creating a new collection
 */
router.post('/', auth, async function(req, res) {
	try {
		// Create the collection
		const collection = await CollectionController.create(req.user._id, req.body);
		respond(res, collection);
	}
	catch (error) {
		respond(res, error);
	}
});

router.route('/:id')

	/**
	 * @description API route for retrieving a collection
	 */
	.get(async function(req, res) {
		try {
			// Find the collection
			const collection = await CollectionController.find(req.params.id);

			// If no collection was found, return a 404
			if (collection === null) {
				const error = new NotFoundError(`Collection [${req.params.id}] was not found.`);
				respond(res, error);
			} else {
				respond(res, collection);
			}
		}
		catch (error) {
			respond(res, error);
		}
	})

	/**
	 * @description API route for updating an existing collection
	 */
	.patch(auth, async function(req, res) {
		try {
			const updatedCollection = await CollectionController.update(req.user._id,
				req.params.id, req.body);
			respond(res, updatedCollection);
		}
		catch(error) {
			respond(res, error);
		}
	})

	/**
	 * @description API route for deleting a collection
	 */
	.delete(auth, async function(req, res) {
		try {
			// Delete the collection
			await CollectionController.remove(req.user._id, req.params.id);
			respond(res, "");
		}
		catch (error) {
			respond(res, error);
		}
	});

module.exports = router;