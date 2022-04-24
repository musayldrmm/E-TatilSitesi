const express = require('express');
const router=express.Router();
const user = require('../models/user');
const Tour=require('../models/tours');
router.get('/', function(req, res){
    const userfind=user.findById(req.session.userId)
    const tourfind=Tour.find({})
    Promise.all([
        userfind,
        tourfind,
      ]).then(([
        account,
        post
      ]) => {
        res.render('index/anasayfa', { 
            account,
            post
        });
      })
      exports.userıd=userfind;

console.log(req.session);
})

module.exports = router
