const express=require("express");
const{default:mongoose}=require("mongoose");
const route=require("./routes/route");
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CONNECTING WITH THE MONGODB-----------------------------------
mongoose.connect("mongodb+srv://AmritaSingh:AAsingh1627@cluster016.jdmspyj.mongodb.net/group6Database",
{useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err))

app.use("/",route)

//CONNECTING WITH THE SERVER----------------------------------------
app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is running on port ${process.env.PORT||3000}`)
});