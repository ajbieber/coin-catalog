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
const { UnauthorizedError, NotFoundError } = require('../lib/error');
const logger = require('../lib/logger');
const { respond } = require('../lib/utils');
const UserController = require('../controllers/user-controller');

// Init router
const router = express.Router();

router.route('/:id')

	/**
     * @description API route for retrieving users
     */
	.get(async function(req, res) {
		try {
			// Find the user
			const user = await UserController.find(req.params.id);

			// If no user was found, return a 404
			if (user === null) {
				const error = new NotFoundError(`User [${req.params.id}] was not found.`);
				respond(res, error);
			} else {
				respond(res, user);
			}
		}
		catch (error) {
			respond(res, error);
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
			respond(res, user);
		}
		catch (error) {
			respond(res, error);
		}
	})

	/**
	 * @description API route for updating existing users
	 */
	.patch(auth, async function(req, res) {
		try {
			// If authenticated user is different from user to be updated, reject
			if (req.user._id !== req.params.id) {
				const error = new UnauthorizedError(`User [${req.user._id}] does`
					+ `not have permission to update user ${req.params.id}.`);
				respond(res, error);
			}
			else {
				const updatedUser = await UserController.update(req.params.id, req.body);
				respond(res, updatedUser);
			}
		}
		catch(error) {
			respond(res, error);
		}
	})

	/**
     * @description API route for deleting users
     */
	.delete(auth, async function(req, res) {
		try {
			// If authenticated user is different from user to be deleted, reject
			if (req.user._id !== req.params.id) {
				const error = new UnauthorizedError(`User [${req.user._id}] does`
					+ `not have permission to delete user ${req.params.id}.`);
				respond(res, error);
			}
			else {
				await UserController.remove(req.params.id);
				respond(res, "");
			}
		}
		catch (error) {
			respond(res, error);
		}
	});

module.exports = router;