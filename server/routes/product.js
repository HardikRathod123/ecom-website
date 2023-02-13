const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photos");

//   ?   Create a new product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;
    product.price = req.body.price;
    product.ownerID = req.body.ownerID;
    product.categoryID = req.body.categoryID;
    
    await product.save();
    res.json({
      status: true,
      message: "Successfully added Product",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

//   ?   Get all products

router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//   ?   Get a single product

router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//   ?   Update a single product

router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          description: req.body.description,
          photo: req.file.location,
          productstockQuantity: req.body.stockQuantity,
          owner: req.body.owner,
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//   ?   Delete a single product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProd = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProd) {
      res.json({
        success: true,
        message: "deleted Successfully",
        deletedProd: deletedProd,
      });
    } else {
      res.json({
        success: true,
        message: "No products found for the given id",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
