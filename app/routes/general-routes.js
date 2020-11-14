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
const { respond } = require('../lib/utils');

// Init router
const router = express.Router();

router.get('/status', async function(reg, res) {
	respond(res, "Server is up!");
});

module.exports = router;