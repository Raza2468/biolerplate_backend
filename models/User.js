const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // minlength: 3,
      // maxlength: 15,
    //   required: [true, ERRORS.REQUIRED.FIRSTNAME_REQUIRED],
    },
    lastName: {
      type: String,
      // minlength: 3,
      // maxlength: 15,
    //   required: [true, ERRORS.REQUIRED.LASTNAME_REQUIRED],
    //   validate: [validator.isAlpha, ERRORS.INVALID.INVALID_LASTNAME],
    },
    country: [String],

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, `Email is required`],
      validate: [validator.isEmail, `Please Enter Valid Email`],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    //   required: [true, ERRORS.REQUIRED.PHONE_REQUIRED],
    },
    otp: {
      type: String,
    },
    password: {
      type: String,
    //   minlength: [8, ERRORS.INVALID.PASSWORD_LENGTH],
      select: false,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: [
          "serviceProvider",
          "productSeller",
          "customer",
          "superAdmin",
          "staff",
          "cityManager",
        ],
        message:
          "Role Must be admin, superAdmin, customer, serviceProvider, cityManager or productSeller",
      },
      default: "customer",
    },
    refrence: {
      type: String,
    },
  }
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
);

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

const User = mongoose.model("user", userSchema);
module.exports = User;
