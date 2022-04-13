const express = require('express');
const router=express.Router();
const user = require('../models/user');

router.get('/', function(req, res){
    user.findById(req.session.userId).then(account=>{
        res.render("index/anasayfa",{account:account});
    })

console.log(req.session);
})

module.exports = router
