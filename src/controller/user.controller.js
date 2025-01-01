const User = require('../model/user.model.js');

async function createUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);
    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}

async function signinUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and Password are required!!',
      });
    }

    const user = await User.findOne({ where: { email } });
    console.log('user', user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found!!',
      });
    }

    const isValid = user.ValidPassword(password);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password!!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User signed in successfully!!',
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}

module.exports = {
  createUser,
  signinUser,
};
