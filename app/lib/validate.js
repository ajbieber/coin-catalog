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

async function user_password(password) {
  // Minimum length of 8
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  // Minimum length of 32
  if (password.length > 32) {
    throw new Error('Password must be less than 32 characters long.');
  }

  // Has at least one lowercase letter
  if (!RegExp('[a-z]').test(password)) {
    throw new Error('Password must contain at least one lowercase letter.');
  }

  // Has at least one uppercase letter
  if (!RegExp('[A-Z]').test(password)) {
    throw new Error('Password must contain at least one uppercase letter.');
  }

  // Has at least one number
  if (!RegExp('[0-9]').test(password)) {
    throw new Error('Password must contain at least one number.');
  }

  // Has at least one special character
  if (!RegExp(/[!@#\$%\^\&*\)\(+=,._-]/).test(password)) {
    throw new Error('Password must contain at least one special character.');
  }
}

module.exports = {
  User: {
    _id: user_id,
    password: user_password
  }
};