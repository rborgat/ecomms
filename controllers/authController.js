const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Email = require("../utils/email");

// Register user
exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(200).json({
    status: "success",
    newUser,
  });
});

//Log out user
exports.logOut = function (req, res, next) {
  req.session.destroy();
  req.logOut();

  res.redirect("/");
};

//Checking if user is Authorized
exports.isAuthorized = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new AppError("You are not authorized, please login", 401));
  }
};
exports.response = (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};

//Sending reset email link to user
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/reset/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();
      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError(
          "There was an error sending the email. Try again later",
          500
        )
      );
    }
  }
});

//Resetting user password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password updated",
  });
});
