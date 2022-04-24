const express = require('express');
const router=express.Router();
const user = require('../models/user');
const Tour=require('../models/tours');


router.get('/:id', function(req, res){
    const userfind=user.findById(req.session.userId)
    const tourfind=Tour.findById(req.params.id)
    Promise.all([
        userfind,
        tourfind,
      ]).then(([
        account,
        post
      ]) => {
        res.render('index/singlepage', { 
            account,
            post
        });
      })
console.log(req.session);
})
module.exports=router;