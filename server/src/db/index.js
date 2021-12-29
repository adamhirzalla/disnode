const { Client } = require("pg");

// PG database client/connection setup
const client = new Client({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

client
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

console.log(
  `Connected to Postgres server ${process.env.PGDATABASE} on Port ${process.env.PGPORT}`
);

module.exports = {
  query: (text, params, callback) => {
    console.log("Query:", text);
    console.log("Values:", params);
    return client.query(text, params, callback);
  },
};
