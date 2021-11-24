const { verifyRefreshToken, generateAccessToken } = require('../../utils/tokenUtils');

const refreshAccessToken = async (req, res) => {
  /**
     * Takes a parameter 
     * refreshToken 
     * in the body of the request. 
     * 
     * Take that refresh token and send a return a response with a valid access code for that user
     * 
     * response format
     * {
     *       accessToken: **********,
        refreshToken: *********
     * }
     */

  try {
    const { refreshToken } = req.body;

    const { payload: refresh, expired } = verifyRefreshToken(refreshToken || '');
    if (!refresh) {
      res.status(403).send('Invalid token!!');
    }

    if (expired) {
      res.status(403).send('Expired token!!');
    }

    const { _id, email, name } = refresh;
    // New access token
    const accessToken = generateAccessToken(_id, email, name);

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(501).json({
      err,
    });
  }
};

module.exports = refreshAccessToken;
