const mongoose= require('mongoose');
const Schema = mongoose.Schema

const tourSchema=new mongoose.Schema({
    name:{type:String},
    avatar:{type:String,},
    //date:{type:Date,default:Date.now},
    //price:{type:Number,require:true}
    cloudinary_id:{
        type:String,
    }
})
const Tour = mongoose.model('Tour',tourSchema)
module.exports=Tour;