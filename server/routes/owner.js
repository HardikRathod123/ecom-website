const express = require("express");
const router = express.Router();

const Owner = require("../models/owner");
const upload = require('../middlewares/upload-photos')


//   ?   POST Req

router.post("/owner", upload.single('photo'),async (req, res) => {
  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();
    res.json({
      success: true,
      message: "Successfully added owner",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//   ?   GET Req

router.get("/owner", async (req, res) => {
  try {
    let owners = await Owner.find();
    res.json({
      success: true,
      owners: owners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


module.exports = router;