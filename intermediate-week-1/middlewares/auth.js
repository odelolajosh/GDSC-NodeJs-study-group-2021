const User = require('../models/User.js');
const { verifyAccessToken } = require('../utils/tokenUtils.js')

exports.requireSignIn = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const [bearer, token] = authorization.split(' ');

    /**
     * verify the token and verify if user is logged in in or not
     * If user is logged in then call the next() function to go to the next middleware
     */
    if (token && bearer === 'Bearer') {
      const { payload } = verifyAccessToken(token);
      if (!payload) throw new Error('Invalid Token');
      
      req.user = await User.findById({ _id: payload._id });
      return next();
    }

    throw new Error('Invalid authorization')
  } catch (err) {
    res.status(401).json({
      error: 'Unauthorized user',
      message: err.message
    })
  }
};
