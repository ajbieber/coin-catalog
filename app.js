/**
 * @module app.js
 *
 * @author Austin Bieber
 */

// NPM Modules
const express = require('express');

// Initialize the app
const app = express();

app.listen(1414, () => {
  console.log("Listening on port 1414");
});