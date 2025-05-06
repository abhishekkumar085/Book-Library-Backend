const { StatusCodes } = require('http-status-codes');
const User = require('../model/user.model');
const { generateToken } = require('../utils/Jwt');
const ClientError = require('../utils/errors/clientError');

const signupUser = async (userDetails) => {
  try {
    const user = await User.create(userDetails);
    console.log('user', user);
    return user;
  } catch (error) {
    console.log('Errors', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Username already exists',
        statusCode: StatusCodes.CONFLICT,
      });
    }
    throw error;
  }
};

const signinUser = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'No registered user found! Please signup',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    //validate password
    const isValid = user.ValidPassword(password);
    if (!isValid) {
        throw new ClientError({
            explanation: 'Invalid data sent from the client',
            message: 'Invalid Password!!',
            statusCode: StatusCodes.NOT_FOUND,
          });
    }
    // generate token
    const token = generateToken({ id: user.id, username: user.username });

    return { user, token };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { signupUser, signinUser };
