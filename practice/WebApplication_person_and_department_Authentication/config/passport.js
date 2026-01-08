const LocalStrategy = require("passport-local").Strategy;
const Student = require("../models/Student");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const student = await Student.findOne({ username });
        if (!student) return done(null, false);

        const isMatch = await student.comparePassword(password);
        if (!isMatch) return done(null, false);

        return done(null, student);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((student, done) => {
    done(null, student.id);
  });

  passport.deserializeUser(async (id, done) => {
    const student = await Student.findById(id);
    done(null, student);
  });
};
