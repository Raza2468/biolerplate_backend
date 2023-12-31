const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const ERRORS = require('../constants/errors')
const { Schema } = mongoose;


const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      // required: [true, ERRORS.REQUIRED.FIRSTNAME_REQUIRED],
    },
    lastName: {
      type: String,
      // validate: [validator.isAlpha, ERRORS.INVALID.INVALID_LASTNAME],
    },
    gender: {
      type: String
    },
    Phone: {
      type: Number,
      required: [true, `Phone is required`],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, `Email is required`],
      // validate: [validator.isEmail, ERRORS.INVALID.INVALID_EMAIL],
    },
    password: {
      type: String,
      minlength: [8, ERRORS.INVALID.PASSWORD_LENGTH]
      // select: false,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
    createBy: {
      type: String,
      required: [true, `createBy is required`],
    },
    role: {
      type: String,
      enum: [
        // "superAdmin",
        "manager",
        "vender",
        "venderManager",
        "cleaner",
      ],
      required: [true, `Role is required`],

      // default: "superAdmin"
    }
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);
const User = mongoose.model("users", userSchema);
module.exports = User;


// assign: {
//   type: String,
// },
// craeteBy: {
//   type: String,
// },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }

// userSchema.virtual("provider", {
//   ref: "provider",
//   localField: "_id",
//   foreignField: "provider",
//   justOne: true,
// });

// userSchema.virtual("customer", {
//   ref: "customer",
//   localField: "_id",
//   foreignField: "customer",
//   justOne: true,
// });
// userSchema.virtual("invite", {
//   ref: "invite",
//   localField: "_id",
//   foreignField: "inviter",
//   justOne: true,
// });
//pre save middleware (runs before data saved to db)

// userSchema.pre("save", encryptPassword);
// userSchema.pre("save", passwordChanged);
//SCHEMA METHODS
// userSchema.methods.correctPassword = correctPassword;
//CHANGED_PASSWORD_AFTER
// userSchema.methods.changedPasswordAfter = passwordChangedAfter;
// userSchema.methods.createPasswordResetToken = async function () {
//   let resetToken;
//   do {
//     resetToken = Math.floor(100000 + Math.random() * 900000).toString();
//   } while (
//     await User.findOne({
//       passwordResetToken: crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex"),
//     })
//   );
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };

// userSchema.methods.createEmailVerifyToken = async function () {
//   let token;
//   do {
//     token = Math.floor(100000 + Math.random() * 900000).toString();
//   } while (
//     await User.findOne({
//       emailVerificationCode: crypto
//         .createHash("sha256")
//         .update(token)
//         .digest("hex"),
//     })
//   );
//   this.emailVerificationCode = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");
//   this.emailVerificationTokenExpires = Date.now() + 10 * 60 * 1000;
//   return token;
// };

// userSchema.methods.createPhoneVerifyToken = async function () {
//   let token;
//   do {
//     token = Math.floor(100000 + Math.random() * 900000).toString();
//   } while (
//     await User.findOne({
//       phoneVerificationCode: crypto
//         .createHash("sha256")
//         .update(token)
//         .digest("hex"),
//     })
//   );
//   this.phoneVerificationCode = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");
//   this.phoneVerificationTokenExpires = Date.now() + 10 * 60 * 1000;
//   return token;
// };

