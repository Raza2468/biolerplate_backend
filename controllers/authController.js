const bcrypt = require("bcrypt-inzi");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const {
  ERRORS,
  STATUS_CODE,
  STATUS,
} = require("../constants/index");



exports.createUser = async (req, res, next) => {
  try {

    if (!req.body.email || !req.body.password) {
      res.status(STATUS_CODE.FORBIDDEN).send(!req.body.email ? ERRORS.REQUIRED.EMAIL_REQUIRED : ERRORS.REQUIRED.PASSWORD_REQUIRED)

    } else {

      User.findOne({ email: req.body.email }, function (err, Doc) {

        if (!err && !Doc) {
          bcrypt.stringToHash(req.body.password).then(async (hash) => {
            let newUser = new User({
              firstname: req.body.firstname,
              email: req.body.email,
              password: hash,
            });
            const registered = await newUser.save();
            User.findOneAndUpdate({ _id: registered._id }, { $set: { id: registered.id + 1 } }, function (err, doc) {
              if (err) {
                console.log("Something wrong when updating data!");
              }
              console.log(doc);
            })
            console.log(req.body)
            res.status(STATUS_CODE.CREATED).send(registered);
          });
        } else if (err) {
          res.status(STATUS_CODE.SERVER_ERROR).send({
            message: "db error",
          });
        } else {
          res.status(409).send({
            message: "user alredy access",
          });
        }
      })
    }
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      status: STATUS.ERROR,
      message: error.message,
    });
  }
};


exports.userLogin = async (req, res, next) => {

  if (!req.body.email || !req.body.password) {
    res.status(403).send(!req.body.email ? ERRORS.REQUIRED.EMAIL_REQUIRED : ERRORS.REQUIRED.PASSWORD_REQUIRED)

  } else {

    User.findOne({ email: req.body.email },
      function (err, user) {
        if (user) {

          bcrypt.varifyHash(req.body.password, user.password).then(result => {
            if (result) {
              var token = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              }, process.env.SERVERSECRETKEY);

              res.send({
                message: "login success",
                user: {
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  // ip: req.connection.remoteAddress,
                  role: user.role,
                },
                token: token
              })

            } else {
              res.status(401).send({
                message: "incorrect password"
              })
            }
          }).catch(e => {
            res.send({
              message: "incorrect email"
            });
          })
        } else {
          res.status(403).send({
            message: "user not found",
            error: err
          });
        }
      })
  }


}