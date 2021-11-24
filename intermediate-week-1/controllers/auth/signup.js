const User = require('../../models/User');

const signup = async (req, res) => {
  /**
   * takes the following fields in the body
   *
   * firstName
   * lastName
   * email
   * password
   * passwordConfirm
   *
   * and saves it to the MongoDB database
   *
   */

  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;
    const user = new User({ firstName, lastName, email, password, passwordConfirm });
    await user.save();

    res.status(201).json({
      message: 'Stored user details successfully',
    });
  } catch (err) {
    res.status(501).send('Could not store user');
  }
};

module.exports = signup;
