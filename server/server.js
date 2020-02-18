const express = require("express");
const nunjucks = require("nunjucks");
const server = express();
const db = require("./services/postgres");

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("./", {
  express: server,
  noCache: true
});

server.get("/", (_req, res) => {
  db.query("SELECT * FROM donors", (_err, result) => {
    if (_err) return res.redirect("/?error=true");

    const donors = result.rows;

    if (_req.query.error) {
      return res.render("index.html", { donors, error: true });
    }

    return res.render("index.html", { donors });
  });
});

server.post("/", (req, res) => {
  const { name, email, blood } = req.body;

  if (name == "" || email == "" || blood == "") {
    return res.redirect("/?error=true");
  }

  const query = `INSERT INTO donors ("name","email","blood") 
  VALUES ($1,$2,$3)`;

  const values = [name, email, blood];

  db.query(query, values, _err => {
    if (_err) return res.redirect("/?error=true");

    return res.redirect("/");
  });
});

server.listen(3000, () => {
  console.log("Server Start");
});
