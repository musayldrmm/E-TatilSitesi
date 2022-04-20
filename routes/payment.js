const stripe = require('stripe')('sk_test_51KprN3LcQz0L1UhGY01f2LbjL8UrAyEIsCNdpSV6aIe5sAU2X5RRrySpVaFvvjQ7GWdwsMCl6D0cYhxc9hLwbwbJ00yJDxVBbO');
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Tour=require('../models/tours');

router.get("/", function (req, res) {
    res.render("index/paymentpage");
  });

module.exports = router;
