const mongoose= require('mongoose');
const Schema = mongoose.Schema

const tourSchema=new mongoose.Schema({
    tourname:{type:String},
    tourshortdesc:{type:String},
    tourdesc:{type:String},
    tourprice:{type:String},
    multiple_image:{type:[]},
    //date:{type:Date,default:Date.now},
    //price:{type:Number,require:true}
   
})
const Tour = mongoose.model('Tour',tourSchema)
module.exports=Tour;