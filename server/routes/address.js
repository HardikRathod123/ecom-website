const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verify-token");
const axios = require('axios');

const Address = require("../models/address");

//   ?   Add a new Address
router.post("/addresses", verifyToken, async (req, res) => {
  try {
    let address = new Address();
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliveryInstructions = req.body.deliveryInstructions;
    address.securityCode = req.body.securityCode;
    address.user = req.decoded._id;

    res.json({
      success: true,
      message: "Successfully created a new address",
    });
  } catch (err) {
    res.status(500).json({
      success: err.message,
    });
  }
});

//   ?   GET Request all addresses

router.get("/addresses", verifyToken, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.decoded._id });
    res.json({
      status: true,
      addresses: addresses,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

//   ?    GET Request Single address
router.get("/addresses/:id", verifyToken, async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id });
    res.json({
      status: true,
      address: address,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

//   ?    Call Countries API
router.get("/countries", async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

//   ?    API set as default
router.put("/addresses/set/default", verifyToken, async (req, res) => {
  try {
    const setAddressDefault = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );
    if (setAddressDefault) {
      res.json({
        status: true,
        message: "Successfully set this address as default",
      });
    }
  } catch (err) {
    res.status.json({ status: false, message: err.message });
  }
});

//   ?    Delete Request Address
router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    const deleteAddress = await Address.remove({
      user: req.decoded._id,
      _id: req.params.id,
    });

    if (deleteAddress) {
      res.json({
        status: true,
        message: "Deleted Successfuly...!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});


module.exports = router;
