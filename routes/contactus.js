const express = require('express');
const router=express.Router();
const User = require('../models/user');

router.get('/',function(req, res){
    User.findById(req.session.userId).then(account=>{
        res.render("index/contactus",{account:account});
    })
})
module.exports=router;