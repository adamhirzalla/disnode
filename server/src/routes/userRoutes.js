// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const auth = require("../middleware/auth");
const Users = require("../db/queries/users");

// Test route
router.get("/", auth, async (req, res, next) => {
  const userId = req.user.id;
  const user = await Users.byId(userId);
  res.send(`Authenticated as: ${user.full_name}`);
  // Users.test().then(result => res.json(result));
});

module.exports = router;
