const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "doe"
});

module.exports = db;
