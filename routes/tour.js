const express = require('express');
const router=express.Router();
const tour_controller = require("../helpers/tour_controller");
const upload = require('../utils/multer')

router.post("/", upload.array("multiple_image", 6), tour_controller.create);
router.get("/", tour_controller.find);

module.exports = router;
