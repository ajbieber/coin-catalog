/**
 * @modules app.controllers.user-controller
 *
 * @author Austin Bieber
 *
 * @description Defines CRUD operations for users.
 */

// Internal Modules
const Coin = require('../models/coin');
const Collection = require('../models/collection');
const User = require('../models/user');

/**
 * @description Creates a new user in the database.
 * @param {object} newUser: The new user's data.
 * @returns {Promise<User>}
 */
async function create(newUser) {
  // Verify the user does not already exist in the database
  if ((await User.findById(newUser._id)) !== null) {
    throw new Error(`User with the username ${newUser._id} already exists.`);
  }

  // Create the user
  const user = new User(newUser);
  await user.save();

  // Create the default collection
  const defaultCollection = new Collection({
    name: "All Coins",
    user: user._id
  });
  await defaultCollection.save();

  return user;
}

/**
 * @description Finds and returns a user by their username.
 * @param {string} userID: The username of the user to find.
 * @returns {Promise<User>}
 */
async function find(userID) {
  return User.findById(userID);
}

/**
 * @description Finds and updates a user.
 *
 */
// TODO

/**
 * @description Deletes a user and all of their content from the database.
 * @param {string} userID: The username of the user to delete.
 * @returns {Promise<void>}
 */
async function remove(userID) {
  // Find and delete all the coins the user owns
  await Coin.deleteMany({ user: userID });

  // Find and delete all the collections the user owns
  await Collection.deleteMany({ user: userID });

  // Find and delete the user
  await User.findByIdAndDelete(userID);
}

module.exports = {
  create,
  find,
  // update,
  remove
};