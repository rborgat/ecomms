const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.register = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    username: req.body.username,
  });
  res.status(200).json({
    status: "success",
    newUser,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).select(
    "+password"
  );

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Current password is incorrect", 401));
    console.log("Im here");
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  res.status(200).json({
    status: "succeed",
    user,
  });
});

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
