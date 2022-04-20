const mongoose= require('mongoose');
const Schema = mongoose.Schema

const tourSchema=new mongoose.Schema({
 user:{type:Schema.Types.ObjectId,ref:'User'},
 cart:{type:Object,required:true},
 name:{type:String,required:true},
 paymentId:{type:String,required:true},

})
const Order = mongoose.model('Order',tourSchema)
module.exports=Order;