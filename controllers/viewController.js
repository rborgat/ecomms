const catchAsync = require("../utils/catchAsync");
const Cart = require("../utils/cart");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");

exports.homePage = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    title: "Home Page",
  });
});

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

exports.convertToUpperCase = (req, res, next) => {
  if (req.params.title) {
    let firstLetter = req.params.title.split("")[0].toUpperCase();
    req.body.productTitle =
      firstLetter + req.params.title.split("").slice(1).join("");
  }
  next();
};
exports.productPage = catchAsync(async (req, res, next) => {
  const products = await Product.find({ category: req.params.title });

  res.status(200).render("product", {
    title: req.body.productTitle,
    productTitle: req.body.productTitle,
    products,
  });
});

exports.checkoutPage = (req, res, next) => {
  res.status(200).render("checkout", {
    title: "Checkout",
  });
};

exports.signup = (req, res, next) => {
  res.status(200).render("signup", {
    title: "Sign up",
  });
};

exports.login = (req, res, next) => {
  res.status(200).render("login", {
    title: "Log in",
  });
};

exports.addToCart = catchAsync(async (req, res, next) => {
  const { id, quantity } = req.body;
  const product = await Product.findById(id);

  const newCart = new Cart(req.session.cart?.items ,req.session?.cart?.ids);

  newCart.saveItem(product, id, quantity);

  
  req.session.cart = newCart;

  res.status(200).json({
    newCart,
  });
});

exports.updateCartItem = (req, res, next) => {
  const { id, quantity } = req.body;

  
  const newCart = new Cart(req.session.cart?.items ,req.session?.cart?.ids);

  newCart.updateItem(id, quantity);

  req.session.cart = newCart;
  
  if (req.session.cart.items.length === 0) {
    delete req.session.cart;
  }

  res.status(200).json({
    newCart,
  });
};
exports.deleteCart = (req, res, next) => {
  delete req.session.cart;

  res.redirect("/shop/bag");
};
exports.deleteCartItem = (req, res, next) => {
  const id = req.params.id;

  const newCart = new Cart(req.session.cart?.items ,req.session?.cart?.ids);

  newCart.deleteItem(id);

  req.session.cart = newCart;
 
  
  if (req.session.cart.items.length === 0) {
    delete req.session.cart;
  }

  res.redirect("/shop/bag");
};
exports.cart = (req, res, next) => {
  res.status(200).render("cart", {
    title: "Cart",
  });
};
