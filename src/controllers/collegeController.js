const CollegeModel= require("../models/college")
const InternModel= require("../models/intern")
 const createCollege=  async function(req,res){
  try{  
    let data= req.body
    let created= await CollegeModel.create(data)
    res.status(201).send({status: true, data: created})
  }catch(error){
    res.status(500).send({status: false, error: error.message })
  }
 }

 const getCollegeDetails= async function(req,res){
    try{
    let data = req.query.collegeName;
    
    // data.isDeleted=false;
    let findByName=await CollegeModel.findOne({name:data,isDeleted:false})
    findByName=findByName.toObject();
    if(!findByName){
        return res.status(404).send({status:false,msg:"college not found"})
    }
    console.log(findByName)

    
let findData = await InternModel.find({ collegeId: findByName._id }).select({collegeId:0,isDeleted:0,createdAt:0,updatedAt:0,__v:0})
if(findData.length==0) return res.status(404).send({status:false,msg:"no intern found"})
    console.log(findData)
     findByName.interns=findData
    const sendData={
        name:findByName.name,
        fullName:findByName.fullName,
        logoLink:findByName.logoLink,
        intern:findData
    }
    res.status(200).send({status:true,data:sendData})
    }
    catch(error){
    res.status(500).send({status: false, error: error.message})
    }
 }



 module.exports.createCollege=createCollege
 module.exports.getCollegeDetails=getCollegeDetails