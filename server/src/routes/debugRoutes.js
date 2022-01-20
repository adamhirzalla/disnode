const router = require("express").Router();
const chalk = require("chalk");
const Member = require("../db/queries/members");

const { resetDb } = require("../db/queries/resetDb");

router.get("/reset_db", (req, res) => {
  resetDb();
  res.send("DB reset");
  console.log(chalk.yellow("DB reset initiated"));
  res.end();
});

router.post("/test", async (req, res) => {
  const { userId, serverId } = req.body;
  try {
    // console.log(userId, serverId);
    const result = await Member.inServerByUser(userId, serverId);
    // console.log(result);
    res.json(result);
  } catch (e) {
    res.send("error");
  }
});

module.exports = router;
