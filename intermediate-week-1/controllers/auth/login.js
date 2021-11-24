const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenUtils');

const login = async (req, res) => {
  /*send a response with the following format if the login is successful
    *{
        accessToken: **********,
        refreshToken: *********
    }
    */
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).send({ msg: 'Invalid login credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).send({ msg: 'Invalid login credentials' });

    const name = user.firstName + ' ' + user.lastName;
    const accessToken = generateAccessToken(user._id, user.email, name);
    const refreshToken = generateRefreshToken(user._id, user.email, name);

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

module.exports = login;
