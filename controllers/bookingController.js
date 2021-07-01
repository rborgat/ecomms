const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync");
const Order = require("../models/orderModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //const address = Object.fromEntries(req.body);
  /*   console.log(req.session);
  const info = req.body.customerInfo;
  info.session = req.session;
  const str = JSON.stringify(req.body.customerInfo); */

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/shop/bag`,
    customer_email: req.body.customerInfo.email,
    client_reference_id: "adddadlksdldldsldskdslklkds",
    line_items: [
      {
        name: "Audiophile Products",
        description: "Best audio accessories on the market",
        amount: req.session.cart.totalPrice * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  /* if (session.success_url) {
    delete req.session.cart;
  } */
  res.status(200).json({
    status: "success",
    session,
  });
});

const createNewOrder = catchAsync(async (session, req) => {
  //const shippingAddress = JSON.parse(session.client_reference_id);
  await Order.create({
    user: ["60d613e99e7c5f072f2145d9"],
    products: ["60d613e99e7c5f072f2145d9"],
    shippingAddress: { address: "1123i4" },
    total: 1200,
    headers: req,
  });
});
exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];
  console.log(req.headers);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    createNewOrder(event.data.object, req.session);
    delete req.session.cart;
  }

  res.status(200).json({ received: true });
};
