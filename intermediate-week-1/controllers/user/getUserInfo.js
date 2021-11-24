const getUserInfo = async (req, res) => {
  //gets info about the logged in user
  /**
   * return a response in the form
   * {
   *      firstName:**************,
   *      lastName: **************,
   *      email: *****************
   * }
   */
  try {
    const user = req.user;
    if (!user) throw new Error('Unauthorized user!!')
    
    const { firstName, lastName, email } = user;
    return res.status(200).json({
      firstName,
      lastName,
      email
    })
  
  } catch (err) {
    res.status(404).json({
      error: 'User not found'
    })
  }
};

module.exports = getUserInfo;
