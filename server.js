require("dotenv").config({ silent: true });

const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const http = require("http");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  let template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
  res.send(template);
});

let event = [];
app.post("/add_event", (req, res) => {
  console.log("received");
  event.push(req.body);
  res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === "development") {
  const reload = require("reload");
  const reloadServer = reload(server, app);
  require("./webpack-dev-middleware").init(app);
}

server.listen(process.env.PORT, function() {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === "development") {
    // require("open")(`http://localhost:${process.env.PORT}`);
  }
});
