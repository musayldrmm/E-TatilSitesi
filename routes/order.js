const express = require('express');
const { db } = require('../models/order');
const router=express.Router();
const Order=require('../models/order');
const User=require('../models/user');
router.get("/:id", async (req, res) => {
    try {
      const userId = req.params.id; //change this to logged -in user id
      const userfind=User.findById(userId)
      const orderfind=Order.find({user:userId})
      Promise.all([
        userfind,
        orderfind,
      ]).then(([
        account,
        order
      ]) => {
        res.render('index/orderdetails', { 
            account,
            order
        });
      })
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong, check logs");
    }
  });

module.exports = router;
