/**
 * @modules app.controllers.coin-controller
 *
 * @author Austin Bieber
 *
 * @description Defines CRUD operations for coins.
 */

// Internal Modules
const Coin = require('../models/coin');
const Collection = require('../models/collection');
const User = require('../models/user');

/**
 * @description Creates a new coin in the database.
 * @param {string} userID: The users ID/username.
 * @param {object} newCoin: The new coin's data.
 * @returns {Promise<Coin>}
 */
async function create(userID, newCoin) {
    // Verify the user exists
    const user = await User.findById(userID);
    if (user === null) {
        throw new Error(`User ${userID} does not exist.`);
    }

    // Verify each collection exsits
    const collections = await Collection.find({ _id: newCoin.collections });
    if (collections.length !== newCoin.collections.length) {
        const existingMap = {};
        collections.forEach((c) => {
            existingMap[c._id] = 1;
        });

        const missingCollections = newCoin.collections
            .filter((c) => !existingMap[c])
            .map(c => c._id);
        throw new Error ('Unable to create new coin. Collections '
            + `[${missingCollections.toString()}] do not exist.`)
    }

    // Create the coin
    const coin = new Coin(newCoin);
    await coin.save();

    return coin;
}

/**
 * @description Finds and returns a coin by its id.
 * @param {string} coinID: The id of the coin to find.
 * @returns {Promise<Coin>}
 */
async function find(coinID) {
    return Coin.findById(coinID);
}

/**
 * @description Finds and updates a coin.
 * @param {string} userID: The id of the user who owns the coin.
 * @param {string} coinID: The id of the coin to update.
 * @param {object} updateObj: An object containing updates to the coin
 * @returns {Promise<Coin>}
 */
async function update(userID, coinID, updateObj) {
    // Verify the user exists
    if (await User.findById(userID) === null) {
        throw new Error(`User ${userID} does not exist.`);
    }

    // Find the coin
    const coin = await Coin.findById(coinID);

    // Verify the user owns the coin
    if (coin.user !== userID) {
        throw new Error(`User ${userID} cannot update coin ${coinID}.`);
    }

    // Update each field in the coin
    Object.keys(updateObj).forEach((key) => {
        // Ensure the property exists
        if (coin._doc.hasOwnProperty(key)) {
            coin[key] = updateObj[key];
        }
    });

    // Update the coin
    await coin.save();

    // Return the updated coin
    return Coin.findById(coinID);
}

/**
 * @description Deletes a coin from the database.
 * @param {string} userID: The id of the user who owns the coin.
 * @param {string} coinID: The id of the coin to delete.
 * @returns {Promise<void>}
 */
async function remove(userID, coinID) {
    // Delete one coin matching the id and user
    await Coin.deleteOne({ user: userID, _id: coinID });
}

module.exports = {
    create,
    find,
    update,
    remove
};