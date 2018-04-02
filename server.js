require("dotenv").config({ silent: true });

const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const bodyParser = require("body-parser");
const moment = require("moment-timezone");
moment.tz.setDefault("UTC");
const serialize = require("serialize-javascript");

const expressVue = require("express-vue");

const app = express();

const vueOptions = {
  head: {
    title: "Page Title",
    meta: [
      { property: "og:title", content: "Page Title" },
      { name: "twitter:title", content: "Page Title" }
    ]
  },
  rootPath: path.join(__dirname, "/src/components/")
};
const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);

app.use(bodyParser.json());

//************************************************************************
const authRoutes = require("./src/controllers/auth-routes");
const profileRoutes = require("./src/controllers/profile-routes");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./src/config/passport-setup");

// set up properties for key
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);
// initialize passport
app.use(passport.initialize());

// alter the req object and change the 'user' value
// that is currently the session id (from cookie) to actual user object
app.use(passport.session());

// connect to mongodb
mongoose.connect(process.env.DBURI, () => {
  console.log("Connected to mongodb");
});

// set up routes
app.use("/auth", authRoutes);

app.use("/profile", profileRoutes);
//************************************************************************

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

let events = [
  {
    description: "weee wooo",
    date: moment("2018-03-04", "YYYY-MM-DD")
  }
];
app.get("/", (req, res) => {
  let template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
  let contentMarker = " <!--APP-->";
  res.send(
    template.replace(
      contentMarker,
      `<script>var __INITIAL_STATE__ = ${serialize(events)}</script>`
    )
  );
});

app.post("/add_event", (req, res) => {
  console.log("received");
  events.push(req.body);
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
});
