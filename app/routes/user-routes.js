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
const { BadRequestError, NotFoundError } = require('../lib/error');
const logger = require('../lib/logger');
const UserController = require('../controllers/user-controller');

// Init router
const router = express.Router();

router.route('/:id')

	/**
     * @description API route for retrieving users
     */
	.get(async function(req, res) {
		// Find the user
		const user = await UserController.find(req.params.id);

		// If no user was found, return a 404
		if (user === null) {
			const error = new NotFoundError(`User [${req.params.id}] was not found.`);
			res.status(error.code).send(error.message);
		}
		else {
			res.send(user);
		}
	})

	/**
     * @description API route for creating new users
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
	 * @description API route for updating existing users
	 */
	.patch(auth, async function(req, res) {
		try {
			// If authenticated user is different from user to be updated, reject
			if (req.user._id !== req.params.id) {
				res.sendStatus(403);
			}
			else {
				const updatedUser = await UserController.update(req.params.id, req.body);
				res.send(updatedUser);
			}
		}
		catch(error) {
			logger.error(error);
			res.sendStatus(500);
		}
	})

	/**
     * @description API route for deleting users
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