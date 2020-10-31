/**
 * @module test/0xx_init_tests/000-init-tests
 *
 * @author Austin Bieber
 *
 * @description Verifies that Chai is installed and assertions are working
 * properly.
 */

// NPM Modules
const chai = require('chai');

describe('000-init-tests', () => {
  it('should verify that chai assertions work properly', basicAssertion);
});

/**
 * @description Basic assertion to ensure chai is installed and working
 * @param done
 */
function basicAssertion(done) {
  chai.expect(2 + 2).to.equal(4);
  done();
}