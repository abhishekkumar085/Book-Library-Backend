const { StatusCodes } = require('http-status-codes');
const User = require('../model/user.model.js');
const { userService } = require('../services');
const { generateToken } = require('../utils/Jwt.js');
const {
  successResponse,
  customErrorResponse,
  internalErrorResponse,
} = require('../utils/common/responseObject.js');

async function createUser(req, res) {
  try {
    const newUser = await userService.signupUser(req.body);
    return res.status(StatusCodes.CREATED).json(
     successResponse(newUser, 'User created successfully!!')
    );
  } catch (error) {
    console.log("Error",error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
}

async function signinUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'username and passwords are required!!',
      });
    }

    const { user, token } = await userService.signinUser(username, password);

    // return res.status(200).json({
    //   success: true,
    //   message: 'User signed in successfully!!',
    //   data: user,
    //   token,
    // });

    return res
      .status(StatusCodes.OK)
      .json(successResponse({ user, token }, 'user signed in successfully!!'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
    // return res.status(500).json({
    //   success: false,
    //   message: error.message,
    //   error: {},
    // });
  }
}

module.exports = {
  createUser,
  signinUser,
};
