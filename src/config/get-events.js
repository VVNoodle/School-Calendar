const User = require("../models/user-model");
const Axios = require("axios");

function getEvents(user) {
  return User.findOne({
    googleId: user.googleId
  }).then(actualUser => {
    return actualUser.events;
  });
}

module.exports = getEvents;
