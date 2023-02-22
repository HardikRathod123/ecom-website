const router = require("express").Router();
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verifyToken = require("../middlewares/verify-token");
const Order = require("../models/order");

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7,
  },
  fast: {
    price: 49.98,
    days: 3,
  },
};

function shipmentPrice(shipmentOption) {
  let estimated = moment().add(shipmentOption.days, "d").format("dddd MMMM Do");
  return { estimated, price: shipmentOption.price };
}

router.post("/shipment", (req, res) => {
  let shipment;
  if (req.body.shipment === "normal") {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.fast);
  }

  res.json({
    success: true,
    shipment: shipment,
  });
});

router.post("/payment", verifyToken, async (req, res) => {
  try {
    //   todo   PAYMENT SETUP

    let order = new Order();
    let cart = req.body.cart;
    cart.map((product) => {
      order.products.push({
        productID: product._id,
        quantity: parseInt(product.quantity),
        price: product.price,
      });
    });

    order.owner = req.decoded._id;
    order.estimatedDelivery = req.body.estimatedDelivery;
    await order.save();

    res.json({
      status: true,
      message: "Successfully made a payment",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      intent: intent,
    });
  }
});

module.exports = router;
