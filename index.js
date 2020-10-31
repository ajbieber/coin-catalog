/**
 * @module index.js
 *
 * @author Austin Bieber
 */

// Node Modules
const fs = require('fs');
const path = require('path');

// Set global config parameter
const conf = fs.readFileSync(path.join(__dirname, 'config', 'default.json'));
global.config = JSON.parse(conf.toString());
global.rootdir = __dirname;

// // Handle command line input
// if (process.argv.length < 3) {
//   console.log("Invalid number of arguments.");
//   process.exit(-1);
// }

// const subcommand = process.argv[2];
//
// // Run a different script depending on the subcommand provided
// const script = require(`./scripts/${subcommand}`);
// script(process.argv);

