/**
 * @module scripts.test
 *
 * @author Austin Bieber
 *
 * @description Script for running one or many unit tests.
 */

// Node Modules
const fs = require('fs');
const path = require('path');

// NPM Modules
const mocha = require('mocha');

/**
 * @description Exported function which runs the mocha tests.
 */
function test() {
  const opts = {};
  const m = new mocha(opts);

  // Add the tests to the mocha obj
  traverseSubdirectory(path.join(rootdir, 'test'), m);

  // Run the tests
  m.run((err) => {
    if (err) {
      process.exit(-1);
    }
    else {
      process.exit(0);
    }
  });
}

/**
 * @description Traverses subdirectories recursively to get all tests files.
 * @param {string} dir: The directory to traverse.
 * @param {Mocha} m: The Mocha object.
 */
function traverseSubdirectory(dir, m) {
  const contents = fs.readdirSync(dir);
  // Check the contents of the directory
  const files = contents.filter((f) => {
    // If another directory, recurse
    if (fs.lstatSync(path.join(dir, f)).isDirectory()) {
      traverseSubdirectory(path.join(dir, f), m);
    }
    else {
      return true;
    }
  });

  // Add each file to mocha object
  files.forEach((f) => {
    m.addFile(path.join(dir, f));
  });
}

module.exports = test;