const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemsModel");
const Product = require("../models/orderItemsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const addOrderIdToItems = require("../utils/helper").addOrderIdToItems;
const randomLetters = require("../utils/helper").randomLetters;

exports.findQuantityOrder = catchAsync(async (req, res, next) => {
  let orderQuantity = await Order.find();

  if (!orderQuantity || orderQuantity.length <= 0) {
    req.body.orderNumber = 1000;
    return next();
  } else {
  }
  req.body.orderNumber = orderQuantity.length + 1000;
  return next();
});

exports.completeOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    orderNumber: `${randomLetters(4)}-${req.body.orderNumber}`,
    total: req.body.total,
    date: Date.now(),
  });

  let orderItems = addOrderIdToItems(req.body.items, order.id, order.date);

  orderItems = await OrderItem.create(orderItems);

  res.status(200).json({
    status: "success",
    order,
    orderItems,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  let order = await Order.findOne({ orderNumber: req.params.orderNumber });
  if (!order) {
    return next(new AppError("Order not found", 401));
  }

  let items = await OrderItem.find({ order: order.id });

  res.status(200).json({
    status: "success",
    order,
    items,
  });
});
