const JwtStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/key');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwt;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.userId).select('email id')
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e);
      }

    })
  )
};