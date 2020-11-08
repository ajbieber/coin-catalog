/**
 * @module app.routes.user-routes
 *
 * @author Austin Bieber
 *
 * @description Implements routes for the user controller.
 */

// NPM Modules
const express = require('express');

// Internal Modules
const auth = require('../lib/auth');
const logger = require('../lib/logger');
const UserController = require('../controllers/user-controller');

// Init router
const router = express.Router();

router.use('/', function(req, res, next) {
	logger.http(`${req.method} ${req.originalUrl}`);
	next();
});

router.route('/:id')

	/**
     * @description API Route for retrieving users
     */
	.get(async function(req, res) {
		// Find the user
		const user = await UserController.find(req.params.id);

		// If no user was found, return a 404
		if (user === null) {
			res.sendStatus(404);
		}
		else {
			res.send(user);
		}
	})

	/**
     * @description API Route for creating new users
     */
	.post(async function (req, res) {
		try {
			if (!req.body._id || req.body._id !== req.params.id) {
				req.body._id = req.params.id;
			}

			const user = await UserController.create(req.body);
			res.send(user);
		}
		catch (error) {
			logger.error(error);
			res.sendStatus(500);
		}
	})

	/**
     * @description API Route for deleting users
     */
	.delete(auth, async function(req, res) {
		try {
			// If authenticated user is different from user to be deleted, reject
			if (req.user._id !== req.params.id) {
				res.sendStatus(403);
			}
			else {
				await UserController.remove(req.params.id);
				res.sendStatus(200);
			}
		}
		catch (error) {
			logger.error(error);
			res.sendStatus(500);
		}
	});

module.exports = router;