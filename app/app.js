/**
 * @module app.app
 *
 * @author Austin Bieber
 *
 * @description Creates and start server
 */

// NPM Modules
const bodyParser = require('body-parser');
const express = require('express');

// Internal Modules
const db = require('./lib/db');
const userRouter = require('./routes/user-routes');

global.config = require('../config/default.json')

async function main() {
    // Start database
    await db.connect();

    const app = express();

    // Setup bodyparser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Setup the routers
    app.use('/users', userRouter);

    app.listen(global.config.server.port, () => {
        console.log(`Listening on port ${global.config.server.port}`);
    })
}

main();