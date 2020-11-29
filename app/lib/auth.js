/**
 * @module app.lib.auth
 *
 * @author Austin Bieber
 *
 * @description Defines functions for authenticating users.
 */

// Node Modules
const crypto = require('crypto');

// Internal Modules
const { PermissionError } = require('./error');
const { respond } = require('./utils');
const UserController = require('../controllers/user-controller');

module.exports = async function authenticate(req, res, next) {
	console.log(req.headers);
	const header = req.headers.authorization;
	let user = null;

	// See if header is basic auth
	const headerParts = header.split(' ');

	if (headerParts[0] === 'Basic' && headerParts.length === 2) {
		// Get the username and password from the header
		const [username, password] = Buffer.from(headerParts[1], 'base64').toString().split(':');

		// Find the user
		user = await UserController.find(username);

		// User does not exist
		if (user === null) {
			const error = new PermissionError('Username or password is incorrect.');
			return respond(res, error);
		}

		// Hash the password
		const derivedKey = crypto.pbkdf2Sync(password, username, 1000, 32, 'sha256');

		// Verify the passwords match
		if (derivedKey.toString('hex') !== user.password) {
			const error = new PermissionError('Username or password is incorrect.');
			return respond(res, error);
		}
	}

	req.user = user;
	next();
};
