const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Must have a user"],
    },
    products: {
      type: Array,
      required: [true, "Must have at least a product"],
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    headers: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
