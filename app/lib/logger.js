/**
 * @module app.lib.logger
 *
 * @author Austin Bieber
 *
 * @description Sets up and initializes a logger.
 */

// NPM Modules
const winston = require('winston');

const logLevels = {
	levels: {
		fatal: 0,
		error: 1,
		warn: 2,
		info: 3,
		http: 4,
		debug: 5
	},
	colors: {
		fatal: 'bold red',
		error: 'dim red',
		warn: 'yellow',
		info: 'magenta',
		http: 'green',
		debug: 'blue'
	}
};

// Create the logger
winston.addColors(logLevels.colors);
const logger = winston.createLogger({
	level: 'debug',
	levels: logLevels.levels,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.printf((info) => {
			const {
				timestamp, level, message
			} = info;

			// Format message to include timestamp, colorized level and message
			const ts = timestamp.slice(0, 19).replace('T', ' ');
			return `${ts} [${level}]: ${message} `;
		}),
	),
	transports: [
		new winston.transports.Console()
	],
});

module.exports = logger;
