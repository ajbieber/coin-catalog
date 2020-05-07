/**
 *
 */

// Internal Modules
const db = require('../app/lib/db');

before(async () => {
  await db.connect();
});

after(async () => {
  await db.disconnect();
});