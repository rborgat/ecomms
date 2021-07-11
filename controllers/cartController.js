const Cart = require("../utils/cart");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");


//Add item to cart
exports.addToCart = catchAsync(async (req, res, next) => {
  const { id, quantity } = req.body;
  const product = await Product.findById(id);

  const newCart = new Cart(req?.session?.cart?.items, req?.session.cart?.ids);

  newCart.saveItem(product, id, quantity);

  req.session.cart = newCart;

  res.status(200).json({
    newCart,
  });
});

//Update an item
exports.updateCartItem = (req, res, next) => {
  const { id, quantity } = req.body;

  const newCart = new Cart(req.session.cart?.items, req.session?.cart?.ids);

  newCart.updateItem(id, quantity);

  req.session.cart = newCart;

  if (req.session.cart.items.length === 0) {
    delete req.session.cart;
  }

  res.status(200).json({
    newCart,
  });
};

//Delete the whole cart
exports.deleteCart = (req, res, next) => {
  delete req.session.cart;

  res.redirect("/shop/bag");
};

//Delete an item from the cart
exports.deleteCartItem = (req, res, next) => {
  const id = req.params.id;

  const newCart = new Cart(req.session.cart?.items, req.session?.cart?.ids);

  newCart.deleteItem(id);

  req.session.cart = newCart;

  if (req.session.cart.items.length === 0) {
    delete req.session.cart;
  }

  res.redirect("/shop/bag");
};
