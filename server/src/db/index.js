const { Client } = require("pg");
const chalk = require("chalk");

// PG database client/connection setup
const client = new Client({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

client
  .connect()
  .then(() =>
    console.log(
      chalk.cyan(
        `-> Connected to ${process.env.PGDATABASE} database on Port ${process.env.PGPORT}`
      )
    )
  )
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = {
  query: (text, params, callback) => {
    // console.log("Query:", text);
    // console.log("Values:", params);
    return client.query(text, params, callback);
  },
};
