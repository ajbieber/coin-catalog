/**
 * @module app.lib.auth
 *
 * @author Austin Bieber
 *
 * @description Defines functions for authenticating users.
 */

// Node Modules
const crypto = require('crypto');

// Internal Modules
const UserController = require('../controllers/user-controller');

module.exports = async function authenticate(req, res, next) {
    const header = req.headers.authorization;
    let user = null;

    // See if header is basic auth
    const headerParts = header.split(' ');

    if (headerParts[0] === "Basic" && headerParts.length === 2) {
        // Get the username and password from the header
        const [username, password] = Buffer.from(headerParts[1], 'base64').toString().split(':');

        // Find the user
        user = await UserController.find(username);

        // User does not exist
        if (user === null) {
            return res.sendStatus(401);
        }

        // Hash the password
        const derivedKey = crypto.pbkdf2Sync(password, username, 1000, 32, 'sha256');

        // Verify the passwords match
        if (derivedKey.toString('hex') !== user.password) {
            return res.sendStatus(401);
        }
    }

    req.user = user;
    next();
}
