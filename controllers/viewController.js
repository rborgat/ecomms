const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const AppError = require("../utils/appError");

//Rendering Home page
exports.homePage = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    title: "Home Page",
  });
});

//Rendering product an overview of a product
exports.overviewPage = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return next(new AppError("There is no product with that name", 404));
  }
  res.status(200).render("detail", {
    title: "Overview Page",
    product,
    session: req.session,
  });
});

// Function to convert page title to Upper Case
exports.convertToUpperCase = (req, res, next) => {
  if (req.params.title) {
    let firstLetter = req.params.title.split("")[0].toUpperCase();
    req.body.productTitle =
      firstLetter + req.params.title.split("").slice(1).join("");
  }
  next();
};

//Rendering the product page(s)
exports.productPage = catchAsync(async (req, res, next) => {
  const products = await Product.find({ category: req.params.title });

  res.status(200).render("product", {
    title: req.body.productTitle,
    productTitle: req.body.productTitle,
    products,
  });
});

//Rendering the checkout page
exports.checkoutPage = (req, res, next) => {
  if (!req.user && req.session.cart) {
    return res.redirect("/login");
  }

  if (!req.user || !req.session.cart) {
    return res.redirect("/");
  }

  res.status(200).render("checkout", {
    title: "Checkout",
  });
};

//Rendering the My-orders page
exports.purchasedProduct = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate("products");

  res.status(200).render("purchased", {
    title: "My-Orders",
    orders,
  });
});
//Rendering the sign up page
exports.signup = (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.status(200).render("signup", {
    title: "Sign up",
  });
};

//Rendering the log in page
exports.login = (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.status(200).render("login", {
    title: "Log in",
  });
};

//Rendering the forgot my password page
exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.status(200).render("forgot", {
    title: "Forgot Password",
  });
});

//Rendering the reset password page
exports.resetPassword = catchAsync(async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.status(200).render("reset", {
    title: "Reset Password",
  });
});

//Rendering the cart page
exports.cart = (req, res, next) => {
  res.status(200).render("cart", {
    title: "Cart",
  });
};
