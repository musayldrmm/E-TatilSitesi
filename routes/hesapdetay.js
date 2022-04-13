const express = require('express');
const router=express.Router();
const User = require('../models/user');
const cloudinary=require('../utils/cloudinary')
const upload = require('../utils/multer')



router.get('/',function(req, res){
    User.findById(req.session.userId).then(account=>{
        res.render("index/hesapozellikleri",{account:account});
    })
})

router.put('/userdetailupdate/:id',async(req, res)=>{
    try{
        let user = await User.findById(req.params.id)
        const data = {
            name: req.body.name || user.name,
            surname:req.body.surname|| user.surname,
            mobilenumber:req.body.mobilenumber || user.mobilenumber ,
            addresline:req.body.addresline || user.addresline,
            Country:req.body.Country|| user.Country,
            City:req.body.City || user.City,
            district:req.body.district || user.district,
    }

    await  User.findByIdAndUpdate(req.params.id,data,{new:true});
    res.redirect("/profilesetting")
}
    catch(err){
        console.log("hata kodu :"+err)
    }
})

router.put('/userimageupdate/:id',upload.single("image"),async(req, res)=>{
    try{
        let user = await User.findById(req.params.id)
        await cloudinary.uploader.destroy(user.cloudinary_id)
        const result = await cloudinary.uploader.upload(req.file.path)
        const data = {
        avatar:result.secure_url || user.avatar,
        cloudinary_id:result.public_id|| user.cloudinary_id
    }

    await  User.findByIdAndUpdate(req.params.id,data,{new:true});
    res.redirect("/profilesetting")
}
    catch(err){
        console.log("hata kodu :"+err)
    }
})
module.exports=router;