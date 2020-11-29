/**
 * @module app.lib.utils
 *
 * @author Austin Bieber
 *
 * @description General utility functions
 */

// Internal Modules
const logger = require('./logger');

/**
 * @description Sends a response based on the data passed in.
 *
 * @param {Response} res: Express response object.
 * @param {object} data: The data to send, potentially an error.
 */
function respond(res, data) {
	// If the data is an error
	if (data instanceof Error) {
		let code = data.code;
		if (!code) {
			code = 500
		}

		logger.warn(data.message);

		res.status(code).send(data.message);
	}
	else {
		// 200 response, send data
		res.send(data);
	}
}

module.exports = {
	respond
};