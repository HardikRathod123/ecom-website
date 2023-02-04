const express = require("express");
const router = express.Router();

const Category = require("../models/category");

//   ?   POST req

router.post("/category", async (req, res) => {
  try {
    let category = new Category();
    category.title = req.body.title;

    await category.save();

    res.json({
      success: true,
      message: "Successfully created a new category",
    });
  } catch (err) {
    res.status(500).json({
      success: err.message,
    });
  }
});

//   ?   GET Req

router.get("/category", async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
