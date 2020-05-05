/**
 * @module scripts.start
 *
 * @author Austin Bieber
 *
 * @description Script for starting up Express server.
 */

// NPM Modules
const express = require('express');

// Internal Modules
const db = require('../app/lib/db');


// Initialize the app
const app = express();


function start(args) {
  db.connect();

// Startup application, listening on specified port
  app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
  });
}

module.exports = start;
