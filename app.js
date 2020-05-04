/**
 * @module app.js
 *
 * @author Austin Bieber
 */

// Node Modules
const fs = require('fs');
const path = require('path');

// NPM Modules
const express = require('express');


// Initialize the app
const app = express();

// Set global config parameter
const conf = fs.readFileSync(path.join(__dirname, 'config', 'default.json'));
global.config = JSON.parse(conf.toString());

// Startup application, listening on specified port
app.listen(config.server.port, () => {
  console.log(`Listening on port ${config.server.port}`);
});