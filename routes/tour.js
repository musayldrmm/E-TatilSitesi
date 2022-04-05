const express = require('express');
const router=express.Router();
const Tour = require('../models/tours')
const cloudinary=require('../utils/cloudinary')
const upload = require('../utils/multer')


router.post('/',upload.array('image',3),async(req,res)=>{
    try{
 const result = await cloudinary.uploader.upload(req.file.path)
let tour = new Tour({
    name:req.body.name,
    avatar:result.secure_url,
    cloudinary_id: result.public_id,
})
await tour.save();
res.json(tour);
    }
    catch (err){
        console.log(err)
    }
})
module.exports=router;