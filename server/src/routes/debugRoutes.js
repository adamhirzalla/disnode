const router = require("express").Router();
const chalk = require("chalk");

const { resetDb } = require("../db/queries/resetDb");

router.get("/reset_db", (req, res) => {
  resetDb();
  res.send("DB reset");
  console.log(chalk.yellow("DB reset initiated"));
  res.end();
});

module.exports = router;
