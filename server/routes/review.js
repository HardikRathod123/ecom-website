const router = require("express").Router();

const Review = require("../models/review");
const verifyToken = require("../middlewares/verify-token");
const upload = require("../middlewares/upload-photos");
const Product = require("../models/product");

router.post(
  "/reviews/:productID",
  [verifyToken, upload.single("photo")], //verify token will go first
  async (req, res) => {
    try {
      let review = new Review();
      review.headline = req.body.headline;
      review.body = req.body.body;
      review.photo = req.file.location;
      review.rating = req.body.rating;
      review.user = req.decoded._id;
      review.productID = req.params.productID;

      await Product.update({ $push: { reviews: review._id } });
      const savedReview = await review.save();

      if (savedReview) {
        res.json({
          success: true,
          message: "Successfully Added Review",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: err.message,
      });
    }
  }
);

router.get("/reviews/:productID", async (req, res) => {
  try {
    const productReview = await Review.find({
      productID: req.params.productID,
    })
      .populate("user")
      .exec();

    res.json({
      success: true,
      reviews: productReview,
    });
  } catch (err) {
    res.status(500).json({
      success: err.message,
    });
  }
});

module.exports = router;
