var bcrypt = require("bcrypt-inzi");
var jwt = require('jsonwebtoken');
const User = require("../models/User");


exports.createUser= async(req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(403).send(`
                please send name, email, passwod, phone and gender in json body.
                e.g:
                {
                    "name": "malik",
                    "email": "Razamalika@gmail.com",
                    "password": "abc"
                }`);
        return;
      }
    
      User.findOne({ email: req.body.email }, function (err, Doc) {
        if (!err && !Doc) {
          bcrypt.stringToHash(req.body.password).then(function (hash) {
            var newUser = new getUser({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
    
            newUser.save((err, data) => {
              if (!err) {
                res.send({ message: "user created" });
                //  status: 200
              } else {
                console.log(err);
                res.status(500).send("user create error, " + err);
              }
            });
          });
        } else if (err) {
          res.status(500).send({
            message: "db error",
          });
        } else {
          res.status(409).send({
            message: "user alredy access",
          });
        }
      });
  } catch (error) {
    
  }
};
