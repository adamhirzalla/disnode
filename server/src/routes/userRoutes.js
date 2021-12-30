// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const { auth } = require("../middleware/auth");
const Users = require("../db/queries/users");

// Testing token
router.post("/me", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await Users.byId(userId);
  res.send(`Authenticated as: ${user.full_name}`);
});

// get all users
router.get("/users", auth, async (req, res) => {
  Users.test().then((result) => res.json(result));
});
module.exports = router;
