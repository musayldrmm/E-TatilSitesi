const mongoose= require('mongoose');
const Schema = mongoose.Schema

const orderSchema=new mongoose.Schema({
 user:{type:Schema.Types.ObjectId,ref:'User'},
 name:{type:String,required:true},
 paymentId:{type:String,required:true},
 tourname:{type:String,required:true},
 price:{type:Number,required:true},
 paymentinfo:{type:String,required:true},
}
);


const Order = mongoose.model('Order',orderSchema)
module.exports=Order;