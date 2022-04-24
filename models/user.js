const mongoose=require('mongoose');
const Schema = mongoose.Schema


const UserSchema=new mongoose.Schema(
    {
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    mobilenumber:{type:String,unique:true},
    addresline:{type:String},
    Country:{type:String},
    City:{type:String},
    district:{type:String},
    avatar:{type:String,},
    cloudinary_id:{type:String}
}
);

const User=mongoose.model('User',UserSchema)
module.exports=User;


