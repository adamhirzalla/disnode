// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const { auth } = require("../middleware/auth");
const User = require("../db/queries/users");
const Icon = require("../db/queries/icons");
const Social = require("../db/queries/socials");

// Testing token
router.get("/me", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.byID(userId);
    delete user.password;
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// get a specific user data
router.post("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.byID(userId);
    if (!user) return res.status(400).send("User not found");
    delete user.password;
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// TODO: get rid of this route, or make it POST/authenticated route
// get all users (FOR TESTING ONLY)
router.get("/users", (req, res) => {
  User.all().then((users) => {
    users.forEach((user) => delete user.password);
    res.json(users);
  });
});

router.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { profile } = req.body;
  try {
    const updatedUser = await User.update(userId, profile);
    for (let i = 1; i <= 6; i++) {
      if (profile[i]?.status === "create") {
        await Social.createSocials(userId, i, profile);
      } else if (profile[i]?.status === "edit") {
        await Social.editSocials(userId, i, profile);
      } else if (profile[i]?.status === "delete") {
        await Social.deleteSocials(userId, i);
      }
    }
    const user = await User.byID(updatedUser.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/icons", async (req, res) => {
  const icons = await Icon.all();
  res.status(200).send(icons);
});

module.exports = router;
