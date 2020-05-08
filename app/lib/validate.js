/**
 * @module app.lib.validate
 *
 * @author Austin Bieber
 *
 * @description Defines functions used to validate different properties on the
 * assorted models.
 */

/**
 * @description Validates the users username (_id).
 * @param {string} _id: The username to validate.
 */
async function user_id(_id) {
  // Minimum length of 4
  if (_id.length < 4) {
    throw new Error('Username must be at least 4 characters long.');
  }

  // Maximum length of 32
  if (_id.length > 32) {
    throw new Error('Username must be less than 32 characters long.');
  }
}

module.exports = {
  User: {
    _id: user_id
  }
};