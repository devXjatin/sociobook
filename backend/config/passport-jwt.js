const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../model/user')
require("dotenv").config({path:"./config/config.env"})
let opts ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}

passport.use(new JWTStrategy(opts, function(jwt_payload, done){
    User.findById(jwt_payload.id, function(err,user){
        if(err){
            console.log('Error in finding user from jwt', err)
            return done(err, false);
        }
        if(user){
            done(null, user);
        }else{
            const options = "Please Login First"
            return done(null, options);
        }
    })
}))

module.exports = passport;