/**
 * @module app.routes.general-routes
 *
 * @author Austin Bieber
 *
 * @description Defines general API routes, not related to any model
 */

// NPM Modules
const express = require('express');

// Internal Modules
const auth = require('../lib/auth');
const { UnauthorizedError, NotFoundError } = require('../lib/error');
const logger = require('../lib/logger');
const { respond } = require('../lib/utils');

// Init router
const router = express.Router();

router.get('/status', async function(reg, res) {
	respond(res, "Server is up!");
});

router.post('/login', auth, async function(req, res) {
	console.log("Successfully logged in");
	respond(res, "Logged in!");
})

module.exports = router;