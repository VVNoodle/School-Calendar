const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    if (user) {
      done(null, user);
    }
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      //accessToken: if we wanna go back and alter users profile we can use this.
      //refreshToken: Will refresh accessToken since it will expire
      //not gonna use access and refresh token
      //profile is profile info
      // passport callback function

      // check if user already exists in our db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (!currentUser) {
          // need to create new user
          new User({
            username: profile.displayName,
            googleId: profile.id,
            events: []
          })
            .save()
            .then(newUser => {
              console.log(newUser);
              done(null, newUser);
            });
        } else {
          //already have use
          done(null, currentUser);
        }
      });
    }
  )
);
