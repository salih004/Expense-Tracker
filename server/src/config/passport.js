const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { prisma } = require('./db');
require('dotenv').config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new Strategy(options, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { userId: jwtPayload.userId },
        select: {
          userId: true,
          name: true,
          email: true
        }
      });

      if (user) {
        // Transform to match expected format
        return done(null, {
          user_id: user.userId,
          name: user.name,
          email: user.email
        });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
