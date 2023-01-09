const mongoose=require("mongoose");
const email=require("mongoose-type-email")
const ObjectId=mongoose.Schema.Types.ObjectId;
const internSchema=new mongoose.Schema(
    {
name:{
    type:String,
    required:true,
    lowercase:true
},
email:{
    type:email,
    required:true,
    unique:true
},
mobile:{
    type:Number,
    required:true,
    unique: true
},
collegeId:{
    type:ObjectId,
    ref:"college"
},
isDeleted:{
    type:Boolean,
    default:false
}
    },{timestamps:true}
)

module.exports=mongoose.model("intern",internSchema)