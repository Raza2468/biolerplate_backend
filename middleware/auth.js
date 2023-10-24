const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/users/userModel");
const {
  ERRORS,
  STATUS_CODE,
  PERMISSIONS,
  STATUS,
} = require("../constants/index");
const roles = require("../constants/userRoles");

exports.authenticate = catchAsync(async (req, res, next) => {
  //getting token and check is it there

//   if (!req.cookies.jToken) {
//     res.status(401).send("include http-only credentials with every request")
//     return;
// }
// jwt.verify(req.cookies.jToken, ServerSecretKey, function (err, decodedData) {
//     if (!err) {

//         const issueDate = decodedData.iat * 1000;
//         // javascript ms 13 digits me js me, mger iat deta hai 16 digit ka
//         const nowDate = new Date().getTime();
//         const diff = nowDate - issueDate;
//         // 86400,000

//         if (diff > 300000) {
//             // expire after 5 min (in milis)
//             res.status(401).send("token expired")
//         } else {
//             // issue new token
//             const token = jwt.sign({
//                 id: decodedData.id,
//                 name: decodedData.name,
//                 email: decodedData.email,
//                 role: decodedData.role,
//             }, ServerSecretKey)
//             res.cookie('jToken', token, {
//                 maxAge: 86_400_000,
//                 httpOnly: true
//             });
//             req.body.jToken = decodedData
//             req.headers.jToken = decodedData;
//             next();
//         }
//     } else {
//         res.status(401).send("invalid token")
//     }
// });
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.session.jwt) {
    token = req.session.jwt;
  }

  if (!token) {
    return next(
      new AppError(ERRORS.UNAUTHORIZED.NOT_LOGGED_IN, STATUS_CODE.UNAUTHORIZED)
    );
  }
  //verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //check if user sitll exists
  const currentUser = await User.findById(decoded.userdata.id).select("+stripeId").populate("customer provider");
  if (!currentUser) {
    return next(new AppError(`User Not Found`, STATUS_CODE.NOT_FOUND));
  }
  if (currentUser.status !== STATUS.APPROVED || currentUser.banned) {
    return next(
      new AppError(
        `Your account is Banned or Inactive, Please contact the customer support`,
        STATUS_CODE.NOT_FOUND
      )
    );
  }

  //check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(ERRORS.UNAUTHORIZED.INVALID_JWT, STATUS_CODE.UNAUTHORIZED)
    );
  }

  //Grant access to protected route
  req.user = currentUser;
  next();
});

// exports.restrictTo =(...role) => (req, res, next) => {
//     if (!role.includes(req.user?.role)) {
//       return next(
//         new AppError(ERRORS.UNAUTHORIZED.UNAUTHORIZE, STATUS_CODE.UNAUTHORIZED)
//       );
//     }
//     if (req.user?.role === roles.admin || req.user?.role === roles.staff) {
//       if (
//         req.method === "GET" &&
//         (!req.user.access ||
//           ![
//             PERMISSIONS.READ,
//             PERMISSIONS.READ_WRITE,
//             PERMISSIONS.READ_WRITE_UPDATE,
//           ].includes(req.user.access))
//       ) {
//         return next(
//           new AppError(
//             ERRORS.UNAUTHORIZED.UNAUTHORIZE,
//             STATUS_CODE.UNAUTHORIZED
//           )
//         );
//       }
//       if (
//         req.method === "POST" &&
//         (!req.user.access ||
//           ![PERMISSIONS.READ_WRITE, PERMISSIONS.READ_WRITE_UPDATE].includes(
//             req.user.access
//           ))
//       ) {
//         return next(
//           new AppError(
//             ERRORS.UNAUTHORIZED.UNAUTHORIZE,
//             STATUS_CODE.UNAUTHORIZED
//           )
//         );
//       }
//       if (
//         req.method === "PATCH" &&
//         (!req.user.access ||
//           ![PERMISSIONS.READ_WRITE_UPDATE].includes(req.user.access))
//       ) {
//         return next(
//           new AppError(
//             ERRORS.UNAUTHORIZED.UNAUTHORIZE,
//             STATUS_CODE.UNAUTHORIZED
//           )
//         );
//       }
//       if (req.method === "DELETE") {
//         return next(
//           new AppError(
//             ERRORS.UNAUTHORIZED.UNAUTHORIZE,
//             STATUS_CODE.UNAUTHORIZED
//           )
//         );
//       }
//     }
//     next();
//   };
