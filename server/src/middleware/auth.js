const passport = require('../config/passport');

const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Authentication error',
        error: error.message
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid or expired token'
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authenticateJWT };
