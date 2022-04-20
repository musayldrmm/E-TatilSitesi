const express = require('express');
const router=express.Router();
const tour_controller = require("../helpers/tour_controller");
const upload = require('../utils/multer')
const User = require('../models/user');

router.get("/", function (req, res) {
    User.findById(req.session.userId).then(account=>{
        res.render("index/tourform",{account:account});
    })
  });
router.post("/", upload.array("multiple_image", 6), tour_controller.create
);


module.exports = router;
