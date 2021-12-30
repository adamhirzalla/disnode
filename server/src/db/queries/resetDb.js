const db = require("../index");
const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

const resetDb = () => {
  const schemaPath = path.join(__dirname, "..", "schema", "create.sql");
  fs.readFile(schemaPath, { encoding: "utf-8" })
    .then((contents) => db.query(contents))
    .then(() => {
      const seedPath = path.join(__dirname, "..", "schema", "seed.sql");
      return fs.readFile(seedPath, { encoding: "utf-8" });
    })
    .then((contents) => db.query(contents))
    .then(() => console.log(chalk.green("DB reset complete")))
    .catch((e) => console.log(chalk.red("Error during DB reset: ", e)));
};

module.exports = { resetDb };
