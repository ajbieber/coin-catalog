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
async function userID(_id) {
  // Minimum length of 4
  if (_id.length < 4) {
    throw new Error('Username must be at least 4 characters long.');
  }

  // Maximum length of 32
  if (_id.length > 32) {
    throw new Error('Username must be less than 32 characters long.');
  }
}

/**
 * @description Validates the users password.
 * @param {string} password: The password to validate.
 */
async function userPassword(password) {
  // Only validate password if it has changed
  if (this.isModified('password')) {
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
}

/**
 * @description Validates the users email.
 * @param {string} email: The email to validate.
 */
async function userEmail(email) {
  // Maximum length of 254 characters, according to RFC 5321
  if (email.length > 254) {
    throw new Error('Email must be less than 254 characters long.');
  }

  // Valid email format
  if (!RegExp(/\S+@\S+\.\S+/).test(email)) {
    throw new Error('Not a valid email address.');
  }
}

/**
 * @description Validates that the collection _id is a valid UUID.
 * @param {string} _id: The _id to validate.
 */
async function collectionID(_id) {
  // Valid UUID
  if (!RegExp(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/).test(_id)) {
    throw new Error('_id must be a valid uuid.');
  }
}

/**
 * @description Validates the the collection name is within length limits.
 * @param {string} name: The name to validate.
 */
async function collectionName(name) {
  // Minimum 2 characters
  if (name.length < 2) {
    throw new Error('Name must be at least 2 characters long.');
  }

  // Maximum 128 characters
  if (name.length > 128) {
    throw new Error('Name must be less than 128 characters long;');
  }
}

/**
 * @description Validates that the coin _id is a valid UUID.
 * @param {string} _id: The _id to validate.
 */
async function coinID(_id) {
  // Valid UUID
  if (!RegExp(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/).test(_id)) {
    throw new Error('_id must be a valid uuid.');
  }
}

/**
 * @description Validates that the coin denomination amount is greater than 0.
 * @param {number} denomAmount: The denomination amount to validate.
 */
async function coinDenomAmount(denomAmount) {
  // Greater than 0
  if (denomAmount <= 0) {
    throw new Error('Denomination amount must be great than 0.');
  }
}

/**
 * @description Validates that the grade is within the Sheldon scale, between 1
 * and 70.
 * @param {number} grade: The grade to validate.
 */
async function coinGrade(grade) {
  // Verify grade is between 1 an 70
  if (grade !== null && (grade < 1 || grade > 70)) {
    throw new Error('Grade must be between 1 and 70.');
  }
}

/**
 * @description Validates that the grader is a known, certified coin grader.
 * @param {string} grader: The grader to validate.
 */
async function coinGrader(grader) {
  grader = grader.toLowerCase();
  // Verify grader is either self or certified grader
  if (!['self', 'pcgs', 'ngc', 'icg', 'anacs'].includes(grader)) {
    throw new Error('Grader must be a known and certified coin grader or self.');
  }
}


module.exports = {
  User: {
    _id: userID,
    password: userPassword,
    email: userEmail
  },
  Collection: {
    _id: collectionID,
    name: collectionName
  },
  Coin: {
    _id: coinID,
    denomAmount: coinDenomAmount,
    grade: coinGrade,
    grader: coinGrader
  }
};