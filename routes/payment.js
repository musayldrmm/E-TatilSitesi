const stripe = require('stripe')('sk_test_51KprN3LcQz0L1UhGY01f2LbjL8UrAyEIsCNdpSV6aIe5sAU2X5RRrySpVaFvvjQ7GWdwsMCl6D0cYhxc9hLwbwbJ00yJDxVBbO');
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Tour=require('../models/tours');
const Order=require('../models/order');

router.get("/:userId/:tourId", async (req, res)=> {
  const user = await User.findById(req.params.userId)
  
  const tour = await Tour.findById(req.params.tourId)
  const session =await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    customer_email:user.email,
    success_url:`${req.protocol}://${req.get('host')}`,
    cancel_url:`${req.protocol}://${req.get('host')}/singlepage/:tourId`,
    client_reference_id:req.params.tourId,
    line_items:[
      {
        name:`${tour.tourname} `,
        description:tour.tourtourdesc,
        amount:tour.tourprice*100,
        currency:'usd',
        quantity:'1',
        images:[tour.multiple_image[0]]
      }
    ]
  });
  let order = new Order({
    user:user._id,
    name:user.name,
    paymentId:session.payment_intent,
    tourname:tour.tourname,
    price:tour.tourprice,
    paymentinfo:session.payment_status
  });
    await order.save()
  res.redirect(session.url) 
  });

module.exports = router;
