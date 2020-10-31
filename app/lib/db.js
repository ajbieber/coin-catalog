/**
 * @module lib.db
 *
 * @author Austin Bieber
 *
 * @description Helper functions for connecting and disconnecting from the
 * database.
 */

// NPM Modules
const mongoose = require('mongoose');

/**
 * @description Connects to the MongoDB instance specified in the config.
 */
function connect() {
  // Define options, most of which remove deprecation warnings
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

  const db = global.config.db;
  mongoose.connect(`mongodb://${db.url}:${db.port}/${db.name}`, options);
}

/**
 * @description Disconnects from the current MongoDB instance.
 */
function disconnect() {
  mongoose.connection.close();
}

module.exports = {
  connect,
  disconnect
};