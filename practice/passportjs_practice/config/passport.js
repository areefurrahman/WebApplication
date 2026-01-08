// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/user");

// passport.use(
//   new LocalStrategy(
//     // {
//     //   usernameField: "email", // tell passport we use email, not username
//     //   passwordField: "password"
//     // },
//     async (username, password, done) => {
//       try {
//         // 1️⃣ Find user
//         const user = await User.findOne({ username });

//         if (!user) {
//           return done(null, false, { message: "User not found" });
//         }

//         // 2️⃣ Compare password (plain for now, hash later)
//         if (user.password !== password) {
//           return done(null, false, { message: "Wrong password" });
//         }

//         // 3️⃣ Success
//         return done(null, user);

//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );



const passport = require('passport')
const Local_Strategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new Local_Strategy(async (username, password, done)=>{

  try{
    const user = await User.findOne({username})

    if(!user){
      return done(null, false, {message:"User not found"})
    }

    if(password !== user.password){
      return done(null, false, {message:"Password incorrect"})

    }

    done(null, user)
  }
  catch(error){
    done(error)
  }

}))
