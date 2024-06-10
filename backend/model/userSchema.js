const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    id:{type:Number,unique:true},
    name:String,
    score:Number,
    age:Number,
    city:String,
    gender:String
})


const userModel = mongoose.model("user",userSchema);

module.exports={userModel}