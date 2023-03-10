const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");

const Address = require("../models/address");
const User = require("../models/user");

//   ?   Add a new Address
router.post("/addresses", verifyToken, async (req, res) => {
  try {
    const address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAdress = req.body.streetAdress;
    address.city = req.body.city;
    address.zipCode = req.body.zipCode;
    address.state = req.body.state;
    address.phoneNumber = req.body.phoneNumber;
    address.deliverInstructions = req.body.deliverInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();
    res.json({
      status: true,
      message: "Successfuly added an Address ...!",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
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

//   ?    Put Request - Edit a address
router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    const foundAddress = await Address.findOne({ _id: req.params.id });
    if (foundAddress) {
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.streetAdress)
        foundAddress.streetAdress = req.body.streetAdress;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliverInstructions)
        foundAddress.deliverInstructions = req.body.deliverInstructions;
      if (req.body.securityCode)
        foundAddress.securityCode = req.body.securityCode;
    }
    await foundAddress.save();

    res.json({
      status: true,
      message: "Successfully updated the address",
    });
  } catch (err) {
    res.status.json({
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
      { $set: { address: req.body.id } },
    );
    if (setAddressDefault) {
      res.json({
        status: true,
        message: "Successfully set this address as default",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
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
