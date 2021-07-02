const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync");
const Order = require("../models/orderModel");
const Session = require("../models/sessionModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  req.session.shippingAddress = req.body.customerInfo;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/shop/bag`,
    customer_email: req.body.customerInfo.email,
    client_reference_id: req.sessionID,
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

const createNewOrder = catchAsync(async (sessions, req) => {
  const session = await Session.findOne({
    _id: sessions.client_reference_id,
  });

  if (session) {
    const sessionJson = JSON.parse(session["_doc"].session);

    await Order.create({
      user: sessionJson.passport.user,
      products: sessionJson.cart.ids,
      shippingAddress: sessionJson.shippingAddress,
      total: sessionJson.cart.totalPrice,
      headers: sessionJson,
    });

    delete sessionJson.cart;
    delete sessionJson.shippingAddress;

    session["_doc"].session = JSON.stringify(sessionJson);

    await session.save();
  }
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
