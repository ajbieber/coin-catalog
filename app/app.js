/**
 * @module app.app
 *
 * @author Austin Bieber
 *
 * @description Creates and start server
 */

// NPM Modules
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


// Internal Modules
const db = require('./lib/db');
const logger = require('./lib/logger');
const coinRouter = require('./routes/coin-routes');
const collectionRouter = require('./routes/collection-routes');
const generalRouter = require('./routes/general-routes');
const userRouter = require('./routes/user-routes');

global.config = require('../config/default.json');

async function main() {
	// Start database
	await db.connect();

	const app = express();
	const router = express.Router();

	// Setup session store
	const store = new MongoDBStore({
		uri: `mongodb://${global.config.db.url}:${global.config.db.port}/${global.config.db.name}`,
		collection: 'sessions'
	});

	// Catch errors
	store.on('error', function(error) {
		logger.fatal(error);
		process.exit(-1);
	});

	app.use(session({
		secret: global.config.server.session.secret,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
		},
		store: store,
		resave: true,
		saveUninitialized: true
	}));

	// Setup bodyparser
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Setup cors
	app.use(cors());

	// Log every HTTP route
	router.use('/', function(req, res, next) {
		logger.http(`${req.method} ${req.originalUrl}`);
		next();
	});

	// Setup the routers
	router.use('/', generalRouter);
	router.use('/users', userRouter);
	router.use('/collections', collectionRouter);
	router.use('/coins', coinRouter);
	app.use('/api', router);

	app.listen(global.config.server.port, () => {
		console.log(`Listening on port ${global.config.server.port}`); // eslint-disable-line
	});
}

main();