const bcrypt = require("bcrypt-inzi");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { v4: uuidv4 } = require('uuid');

const uniqueId = uuidv4();
const {
  ERRORS,
  STATUS_CODE,
  STATUS,
} = require("../constants/index");



exports.createUser = async (req, res, next) => {
  try {
    const { email, password, firstname, createBy, role, Phone } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(STATUS_CODE.BAD_REQUEST).send({
        error: !email ? ERRORS.REQUIRED.EMAIL_REQUIRED : ERRORS.REQUIRED.PASSWORD_REQUIRED
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(STATUS_CODE.CONFLICT).send({
        message: "User already exists",
        errors: { email: "Email already in use" }
      });
    }

    const hash = await bcrypt.stringToHash(password);
    const newUser = new User({
      firstname,
      email,
      createBy,
      role,
      Phone,
      password: hash,
      id: Date.now()
    });

    const registered = await newUser.save();
    return res.status(STATUS_CODE.CREATED).send(registered);

  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).send({
        message: !email ? ERRORS.REQUIRED.EMAIL_REQUIRED : ERRORS.REQUIRED.PASSWORD_REQUIRED
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).send({
        message: "Incorrect email or password"
      });
    }

    const isPasswordValid = await bcrypt.varifyHash(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }, process.env.SERVERSECRETKEY);

      return res.send({
        message: "Login success",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        token: token
      });
    } else {
      return res.status(401).send({
        message: "Incorrect email or password"
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
