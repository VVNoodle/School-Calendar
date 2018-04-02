require("dotenv").config({ silent: true });

const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const bodyParser = require("body-parser");
const moment = require("moment-timezone");
moment.tz.setDefault("UTC");
const serialize = require("serialize-javascript");
const mongoose = require("mongoose");
const User = require("./src/models/user-model");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./src/config/passport-setup");
const getEvents = require("./src/config/get-events");

app.use(bodyParser.json());

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
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/dist", express.static(path.join(__dirname, "dist")));
const authRoutes = require("./src/controllers/auth-routes");
app.use("/auth", authRoutes);
const profileRoutes = require("./src/controllers/profile-routes");
app.use("/profile", profileRoutes);

let events = [];
let user = {};
app.get("/", (req, res) => {
  if (req.user) {
    user = req.user;

    User.findOne({
      googleId: user.googleId
    }).then(actualUser => {
      let template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
      let contentMarker = " <!--APP-->";
      console.log("we rise " + actualUser);
      res.send(
        template.replace(
          contentMarker,
          `<script>var __INITIAL_STATE__ = ${serialize(
            actualUser.events
          )}</script>`
        )
      );
    });
  } else {
    if (!events) {
      events = [{}];
    }

    let template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
    let contentMarker = " <!--APP-->";
    console.log("we rise " + events);
    res.send(
      template.replace(
        contentMarker,
        `<script>var __INITIAL_STATE__ = ${serialize(events)}</script>`
      )
    );
  }
});

app.post("/add_event", (req, res) => {
  events.push(req.body);
  User.findOneAndUpdate(
    {
      googleId: req.user.googleId
    },
    {
      $push: {
        events: req.body
      }
    },
    { new: true }
  ).then(user => {
    console.log("add: " + user);
  });
  res.sendStatus(200);
});

// set up server
const server = http.createServer(app);
if (process.env.NODE_ENV === "development") {
  const reload = require("reload");
  const reloadServer = reload(server, app);
  require("./webpack-dev-middleware").init(app);
}

server.listen(process.env.PORT, function() {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
