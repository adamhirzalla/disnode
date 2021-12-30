// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const { auth } = require("../middleware/auth");
const Users = require("../db/queries/users");

// Testing token
router.post("/me", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await Users.byId(userId);
    res.status(200).send(`Authenticated as: ${user.full_name}`);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// get all users
router.get("/users", (req, res) => {
  Users.test().then((result) => res.json(result));
});
module.exports = router;
